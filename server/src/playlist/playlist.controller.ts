import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from "./playlist.dto";
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";


@Controller('/playlists')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) { }


    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
      ]))
    create(@UploadedFiles() files, @Body() dto: CreatePlaylistDto){
        const picture = files;
        return this.playlistService.create(dto, picture);
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.playlistService.search(query);
    }

    @Get(':id')
    getPlaylist(@Param('id') id: ObjectId){
        return this.playlistService.getOne(id);
    }

    @Get()
    getAllPlaylists(){
        return this.playlistService.getAll();
    }
}