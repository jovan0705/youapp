import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('rabbit-mq-module') private readonly client: ClientProxy,
  ) {}

  async sendNotification(notification: NotificationDto) {
    return await this.client.emit('notification', notification).toPromise();
  }
}
