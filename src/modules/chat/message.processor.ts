// src/chat/message.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ChatService } from 'src/services/chat.service';
import { ChatGateway } from './chat.gateway';

@Processor('messages')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(
    private readonly chatGateway: ChatGateway,
    private readonly chatService: ChatService,
  ) {}

  @Process('new-message')
  async handleNewMessage(job: Job<any>) {
    this.logger.debug(`Processing message: ${job.id}`);
    const { message } = job.data;

    try {
      // Thực hiện các tác vụ phụ như gửi thông báo, phân tích nội dung, v.v.
      
      // Cập nhật trạng thái tin nhắn nếu cần
      
      this.logger.debug(`Message processed successfully: ${job.id}`);
    } catch (error) {
      this.logger.error(`Failed to process message: ${error.message}`);
      throw error;
    }
  }
}
