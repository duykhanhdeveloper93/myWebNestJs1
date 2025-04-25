// src/chat/chat.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsResponse,
    ConnectedSocket,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger, UseGuards } from '@nestjs/common';
  import { createAdapter } from '@socket.io/redis-adapter';
  import { JwtService } from '@nestjs/jwt';
import { ChatService } from 'src/services/chat.service';
import { createRedisClient } from 'src/config/redis.config';
import { CreateMessageDto } from 'src/dtos/create-message.dto';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Trong môi trường production, hãy giới hạn nguồn gốc
    },
    namespace: 'chat',
  })
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger = new Logger('ChatGateway');
    private userSocketMap = new Map<number, string>();
  
    constructor(
      private readonly chatService: ChatService,
      private readonly jwtService: JwtService,
    ) {}
  
    async afterInit(server: Server) {
      // Thiết lập Redis adapter cho Socket.IO
      const pubClient = createRedisClient();
      const subClient = pubClient.duplicate();
      
      await Promise.all([pubClient.connect(), subClient.connect()]);
      
      server.adapter(createAdapter(pubClient, subClient));
      this.logger.log('WebSocket Gateway initialized');
    }
  
    async handleConnection(client: Socket) {
      try {
        const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
        
        if (!token) {
          client.disconnect();
          return;
        }
  
        const decoded = this.jwtService.verify(token);
        const userId = decoded.sub;
  
        // Lưu trữ mapping giữa userId và socketId
        this.userSocketMap.set(userId, client.id);
        
        // Tham gia vào room cá nhân
        client.join(`user_${userId}`);
        
        this.logger.log(`Client connected: ${client.id}, User ID: ${userId}`);
      } catch (error) {
        this.logger.error(`Connection error: ${error.message}`);
        client.disconnect();
      }
    }
  
    handleDisconnect(client: Socket) {
      // Xóa user khỏi mapping khi disconnect
      for (const [userId, socketId] of this.userSocketMap.entries()) {
        if (socketId === client.id) {
          this.userSocketMap.delete(userId);
          break;
        }
      }
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
      @ConnectedSocket() client: Socket,
      @MessageBody() createMessageDto: CreateMessageDto,
    ): Promise<WsResponse<any>> {
      try {
        const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
        const decoded = this.jwtService.verify(token);
        const senderId = decoded.sub;
  
        const message = await this.chatService.createMessage(senderId, createMessageDto);
        
        // Gửi tin nhắn đến người nhận
        const receiverSocketId = this.userSocketMap.get(createMessageDto.receiverId);
        
        // Gửi tin nhắn đến room của người nhận
        this.server.to(`user_${createMessageDto.receiverId}`).emit('newMessage', message);
        
        // Gửi xác nhận đến người gửi
        return { event: 'messageSent', data: message };
      } catch (error) {
        this.logger.error(`Error sending message: ${error.message}`);
        return { event: 'error', data: { message: 'Failed to send message' } };
      }
    }
  
    @SubscribeMessage('markAsRead')
    async handleMarkAsRead(
      @ConnectedSocket() client: Socket,
      @MessageBody() data: { messageId: string },
    ): Promise<WsResponse<any>> {
      try {
        await this.chatService.markAsRead(data.messageId);
        return { event: 'messageRead', data: { messageId: data.messageId } };
      } catch (error) {
        this.logger.error(`Error marking message as read: ${error.message}`);
        return { event: 'error', data: { message: 'Failed to mark message as read' } };
      }
    }
  
    @SubscribeMessage('joinChat')
    async handleJoinChat(
      @ConnectedSocket() client: Socket,
      @MessageBody() data: { otherUserId: number },
    ): Promise<WsResponse<any>> {
      try {
        const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
        const decoded = this.jwtService.verify(token);
        const userId = decoded.sub;
  
        // Lấy lịch sử tin nhắn
        const messages = await this.chatService.getConversation(userId, data.otherUserId);
        
        return { event: 'chatHistory', data: messages };
      } catch (error) {
        this.logger.error(`Error joining chat: ${error.message}`);
        return { event: 'error', data: { message: 'Failed to join chat' } };
      }
    }
  
    // Thông báo cho client khi có người online/offline
    public notifyUserStatus(userId: number, isOnline: boolean): void {
      this.server.emit('userStatus', { userId, isOnline });
    }
  }
  