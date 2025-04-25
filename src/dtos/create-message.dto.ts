// src/chat/dto/create-message.dto.ts
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  receiverId: number;
}

// src/chat/dto/message.dto.ts
export class MessageDto {
  id: string;
  content: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  isRead: boolean;
  createdAt: Date;
}
