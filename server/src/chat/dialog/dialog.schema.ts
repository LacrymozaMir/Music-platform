import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Message } from '../message/message.schema';

export type DialogDocument = Dialog & Document;

@Schema()
export class Dialog {

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  userOne: User;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  userTwo: User;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]})
  messages: Message[];
}


export const DialogSchema = SchemaFactory.createForClass(Dialog);