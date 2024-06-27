import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
@Processor('notification_queue')
export class NotificationConsumer {
  constructor(private readonly messageService: MessagesService) {}

  @Process()
  async processNotification(job: Job<NotificationDto>) {
    console.log(job, 'ini job');
    const notification = job.data;
    if (!notification) {
      console.error('Notification is undefined');
      return;
    }
    await this.messageService.send(notification);
    return notification;
  }
}
