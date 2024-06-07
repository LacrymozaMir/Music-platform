import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from '../user.schema';

export type friendRequestDocument = FriendRequest & Document;

@Schema()
export class FriendRequest {

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  sender: User;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  receiver: User;

  @Prop()
  status: string;

}


export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);