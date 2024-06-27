import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MessagesModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
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
