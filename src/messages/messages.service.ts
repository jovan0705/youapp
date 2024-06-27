import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './interfaces/message.interface';
import { Message as MessageSchema } from './schemas/message.schema';
import { Model } from 'mongoose';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(MessageSchema.name) private messageModel: Model<Message>,
  ) {}
  async send(sendMessageDto: SendMessageDto): Promise<Message> {
    const sendMessage = new this.messageModel({
      ...sendMessageDto,
      date: new Date(),
    });
    return sendMessage.save();
    // return 'hehe';
  }

  async getUserChats(user) {
    // return this.messageModel.find({ chatId: { $regex: user.id } }).exec();
    // return await this.messageModel.distinct('chatId', {
    //   chatId: { $regex: user.id },
    // });
    const chatRooms = await this.messageModel.aggregate([
      { $match: { chatId: { $regex: user.id } } },
      {
        $group: {
          _id: {
            chatId: '$chatId',
            participant1: '$participant1',
            participant2: '$participant2',
          },
        },
      },
    ]);
    const newChatRoom = await Promise.all(
      chatRooms.map(async (el) => {
        const latestChat = await this.messageModel
          .findOne({
            chatId: el._id.chatId,
          })
          .sort('-date')
          .select(['-_id', 'email', 'username', 'message', 'date', 'name']);
        return {
          chatId: el._id.chatId,
          participant1: el._id.participant1,
          participant2: el._id.participant2,
          latestChat,
        };
      }),
    );
    return newChatRoom;
  }

  async getChatDetail(param) {
    return this.messageModel
      .find({
        chatId: param.id,
      })
      .select([
        '-_id',
        'email',
        'username',
        'message',
        'date',
        'name',
        'participant1',
        'participant2',
      ])
      .exec();
  }

  async findAll() {
    return this.messageModel.find().exec();
  }
}
