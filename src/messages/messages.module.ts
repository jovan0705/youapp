import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitmq.module';
import { ConsumerService } from './messages.consumer';
// import { RabbitMQService } from 'src/rabbitMQ/rabbitmq.service';
// import { NotificationConsumer } from 'src/rabbitMQ/rabbitmq.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RabbitMQModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, ConsumerService],
})
export class MessagesModule {}
