import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Dialog } from '../dialog/dialog.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {

  @Prop()
  text: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  userOne: User;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  userTwo: User;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dialog'}]})
  dialog: Dialog;

  @Prop()
  mesTime: Date;
}


export const MessageSchema = SchemaFactory.createForClass(Message);