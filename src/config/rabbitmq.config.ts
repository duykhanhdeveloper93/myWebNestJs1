// src/config/rabbitmq.config.ts
import { ClientOptions, Transport } from '@nestjs/microservices';

export const rabbitMQConfig: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
    queue: 'chat_messages_queue',
    queueOptions: {
      durable: true,
    },
  },
};
