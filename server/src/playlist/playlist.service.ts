import { Injectable } from "@nestjs/common";
import { CreatePlaylistDto } from "./playlist.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Playlist, PlaylistDocument } from "./playlist.schema";
import { Model, ObjectId } from "mongoose";
import { FileService, fileType } from "src/file/file.service";

@Injectable()

export class PlaylistService{
    constructor(@InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
                private fileService: FileService
    ) {}

    async create(dto: CreatePlaylistDto, picture): Promise<Playlist>{
        const picturePath = this.fileService.createFile(fileType.IMAGE, picture);
        const playlist = await this.playlistModel.create({...dto, listens: 0, picture: picturePath})
        return playlist;
    }

    async getOne(id: ObjectId): Promise<Playlist> {
        const playlist = (await this.playlistModel.findById(id)).populate('tracks');
        return playlist;
    }

    async getAll(): Promise<Playlist[]>{
        const playlists = await this.playlistModel.find().populate('tracks')
        return playlists;
    }

    async search(query: string): Promise<Playlist[]> {
        const playlists = await this.playlistModel.find( {
            name: {$regex: new RegExp(query, 'i')}
        })
        return playlists;
    }
}