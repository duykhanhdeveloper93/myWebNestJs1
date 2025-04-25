// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/config/rabbitmq.config';
import { Message } from 'src/entities/message/message.entity';
import { ChatGateway } from './chat.gateway';
import { ChatService } from 'src/services/chat.service';
import { ChatController } from 'src/controllers/chat.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        ...rabbitMQConfig,
      },
    ]),
    UsersModule,
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
