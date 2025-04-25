// src/chat/chat.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreateMessageDto } from 'src/dtos/create-message.dto';
import { ChatService } from 'src/services/chat.service';


@Controller('chat')

export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('messages')
  async createMessage(@Req() req, @Body() createMessageDto: CreateMessageDto) {
    return this.chatService.createMessage(req.user.id, createMessageDto);
  }

  @Get('conversations')
  async getUserConversations(@Req() req) {
    return this.chatService.getUserConversations(req.user.id);
  }

  @Get('messages/:otherUserId')
  async getConversation(@Req() req, @Param('otherUserId') otherUserId: number) {
    return this.chatService.getConversation(req.user.id, otherUserId);
  }

  @Get('unread/:otherUserId')
  async getUnreadCount(@Req() req, @Param('otherUserId') otherUserId: number) {
    return {
      count: await this.chatService.countUnreadMessages(otherUserId, req.user.id),
    };
  }

  @Post('messages/:messageId/read')
  async markAsRead(@Param('messageId') messageId: string) {
    await this.chatService.markAsRead(messageId);
    return { success: true };
  }
}
