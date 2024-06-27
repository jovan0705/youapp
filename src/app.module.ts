import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQService } from './rabbitMQ/rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MessagesModule,
    MongooseModule.forRoot(
      'mongodb+srv://jovan:HLBIrUjKvZ960WYS@youapp.zeboxwe.mongodb.net',
    ),
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: '',
            module: UsersModule,
          },
        ],
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            module: MessagesModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
