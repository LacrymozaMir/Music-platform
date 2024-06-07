import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Track, TrackSchema } from 'src/track/schemas/track.schema';
import { Playlist, PlaylistSchema } from 'src/playlist/playlist.schema';
import { DialogModule } from 'src/chat/dialog/dialog.module';
import { FriendRequest, FriendRequestSchema } from './friendRequest/friendRequest.schema';
import { Dialog, DialogSchema } from 'src/chat/dialog/dialog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema},]),
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{name: Playlist.name, schema: PlaylistSchema}]),
    MongooseModule.forFeature([{name: Dialog.name, schema: DialogSchema}]),
    MongooseModule.forFeature([{name: FriendRequest.name, schema: FriendRequestSchema}]),
    DialogModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: '30d'},
      }),
      inject: [ConfigService],
    }),
],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
