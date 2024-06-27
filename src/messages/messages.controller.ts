import { Body, Controller, UseGuards, Request, Param } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { RabbitMQService } from '../rabbitMQ/rabbitmq.service';
import { AuthGuard } from '..//auth/auth.guard';
import { MessagesService } from './messages.service';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class MessagesController {
  constructor(
    private rabbitMqService: RabbitMQService,
    private messageService: MessagesService,
  ) {}

  @MessagePattern('notification')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
  }

  @UseGuards(AuthGuard)
  @Post('/send')
  async sendMessage(@Body() message: SendMessageDto) {
    await this.rabbitMqService.sendNotification(message);
    return 'Notification sent to RabbitMQ';
  }

  @UseGuards(AuthGuard)
  @Get('/getMessages')
  async getMessage() {
    const messages = await this.messageService.findAll();
    return messages;
  }

  @UseGuards(AuthGuard)
  @Get('/getUserChats')
  async getUserChats(@Request() req) {
    const messages = await this.messageService.getUserChats(req.user);
    return messages;
  }

  @UseGuards(AuthGuard)
  @Get('/getChatDetail/:id')
  async getChatDetail(@Param() params: any) {
    const messages = await this.messageService.getChatDetail(params);
    return messages;
  }
}
