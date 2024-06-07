import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/schemas/track.schema';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
  @Prop()
  name: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  tracks: Track[];

  @Prop()
  listens: number;

  @Prop()
  picture: string;

}


export const PlaylistSchema = SchemaFactory.createForClass(Playlist);