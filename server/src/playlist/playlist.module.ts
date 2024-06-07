import { Module } from "@nestjs/common";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Playlist, PlaylistSchema } from "./playlist.schema";
import { Track, TrackSchema } from "src/track/schemas/track.schema";
import { FileService } from "src/file/file.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Playlist.name, schema: PlaylistSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}])
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService, FileService],
})

export class PlaylistModule{}