import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { PlaylistModule } from "./playlist/playlist.module";
import { DialogModule } from "./chat/dialog/dialog.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
          }),
        MongooseModule.forRoot('mongodb://localhost:27017'),
        TrackModule,
        FileModule,
        UserModule,
        AuthModule,
        PlaylistModule,
        DialogModule,
    ],
})

export class AppModule{}
