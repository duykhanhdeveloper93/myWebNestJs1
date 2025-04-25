// src/chat/chat.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from 'src/entities/message/message.entity';
import { UserService } from './user.service';
import { CreateMessageDto, MessageDto } from 'src/dtos/create-message.dto';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject('CHAT_SERVICE')
    private readonly chatClient: ClientProxy,
    private readonly userService: UserService,
  ) {}

  async createMessage(senderId: number, createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const sender = await this.userService.getById(senderId);
    const receiver = await this.userService.getById(createMessageDto.receiverId);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const message = this.messageRepository.create({
      content: createMessageDto.content,
      sender,
      senderId: sender.id,
      receiver,
      receiverId: receiver.id,
    });

    const savedMessage = await this.messageRepository.save(message);
    
    // Gửi tin nhắn đến RabbitMQ để xử lý không đồng bộ
    this.chatClient.emit('message_created', {
      id: savedMessage.id,
      content: savedMessage.content,
      senderId: savedMessage.senderId,
      receiverId: savedMessage.receiverId,
      createdAt: savedMessage.createdAt,
    });

    return this.mapToMessageDto(savedMessage);
  }

  async getConversation(userId1: number, userId2: number): Promise<MessageDto[]> {
    const messages = await this.messageRepository.find({
      where: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
      order: { createdAt: 'ASC' },
    });

    return messages.map(message => this.mapToMessageDto(message));
  }

  async markAsRead(messageId: string): Promise<void> {
    await this.messageRepository.update(messageId, { isRead: true });
  }

  async getUserConversations(userId: number): Promise<any[]> {
    // Lấy danh sách các cuộc trò chuyện của người dùng
    const sentMessages = await this.messageRepository
      .createQueryBuilder('message')
      .select('message.receiverId', 'userId')
      .addSelect('MAX(message.createdAt)', 'lastMessageAt')
      .where('message.senderId = :userId', { userId })
      .groupBy('message.receiverId')
      .getRawMany();

    const receivedMessages = await this.messageRepository
      .createQueryBuilder('message')
      .select('message.senderId', 'userId')
      .addSelect('MAX(message.createdAt)', 'lastMessageAt')
      .where('message.receiverId = :userId', { userId })
      .groupBy('message.senderId')
      .getRawMany();

    // Kết hợp và loại bỏ trùng lặp
    const conversationMap = new Map();
    [...sentMessages, ...receivedMessages].forEach(item => {
      if (!conversationMap.has(item.userId) || new Date(item.lastMessageAt) > new Date(conversationMap.get(item.userId).lastMessageAt)) {
        conversationMap.set(item.userId, item);
      }
    });

    // Lấy thông tin người dùng và tin nhắn cuối cùng
    const conversations = [];
    for (const [userId, data] of conversationMap.entries()) {
      const user = await this.userService.getById(userId);
      const lastMessage = await this.messageRepository.findOne({
        where: [
          { senderId: userId, receiverId: userId },
          { senderId: userId, receiverId: userId },
        ],
        order: { createdAt: 'DESC' },
      });

      conversations.push({
        user: {
          id: user.id,
          name: user.firstName,
          // Thêm các thông tin khác của người dùng nếu cần
        },
        lastMessage: this.mapToMessageDto(lastMessage),
        unreadCount: await this.countUnreadMessages(userId, userId),
      });
    }

    return conversations.sort((a, b) => 
      new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );
  }

  async countUnreadMessages(senderId: number, receiverId: number): Promise<number> {
    return this.messageRepository.count({
      where: {
        senderId,
        receiverId,
        isRead: false,
      },
    });
  }

  private mapToMessageDto(message: Message): MessageDto {
    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      senderName: message.sender?.firstName || 'Unknown',
      receiverId: message.receiverId,
      receiverName: message.receiver?.firstName || 'Unknown',
      isRead: message.isRead,
      createdAt: message.createdAt,
    };
  }
}
