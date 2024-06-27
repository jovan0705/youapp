import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  participant1: string;

  @Prop({ required: true })
  participant2: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  name: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
