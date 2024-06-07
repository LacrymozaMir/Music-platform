import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Dialog } from 'src/chat/dialog/dialog.schema';
import { Playlist } from 'src/playlist/playlist.schema';
import { Track } from 'src/track/schemas/track.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({unique: true})
  name: string;

  @Prop({minlength: 6})
  password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  addedTracks: Track[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}]})
  addedPlaylists: Playlist[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dialog'}]})
  dialogs: Dialog[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  friends: User[];
}


export const UserSchema = SchemaFactory.createForClass(User);