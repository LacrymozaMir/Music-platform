import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateUserDto){
        return this.userService.create(dto);
    }

    @Get()
    getOne(name: string){
        return this.userService.findOne(name)
    }

    @Post('addTrack/:id')
    @UseGuards(JwtAuthGuard)
    addTrack(@Param('id') id: ObjectId, @Request() req){
        return this.userService.addTrack(id, req);
    }

    @Post('addPlaylist/:id')
    @UseGuards(JwtAuthGuard)
    addPlaylist(@Param('id') id: ObjectId, @Request() req){
        return this.userService.addPlaylist(id, req);
    }

    @Get('/myPlaylists')
    @UseGuards(JwtAuthGuard)
    getUserPlaylists(@Request() req){
        return this.userService.getPlaylists(req);
    }


    @Get('/myTracks')
    @UseGuards(JwtAuthGuard)
    getUserTracks(@Request() req){
        return this.userService.getTracks(req);
    }

    @Delete('myTracks/:id')
    @UseGuards(JwtAuthGuard)
    deleteTrack(@Param('id') id: ObjectId, @Request() req) {
        return this.userService.deleteTrack(id, req);
    }

    @Get('/allUsers')
    getAllUsers(){
        return this.userService.getAll();
    }

    @Get('/canFriend')
    @UseGuards(JwtAuthGuard)
    canFriend(@Request() req){
        return this.userService.canFriend(req);
    }

    @Get('/getOne/:id')
    getDataOne(@Param('id') id: ObjectId){
        return this.userService.getDataOne(id);
    }

    @Get('/friends')
    @UseGuards(JwtAuthGuard)
    getAllFriends(@Request() req){
        return this.userService.getAllFriends(req);
    }
    
    @Post('/friends/:id')
    @UseGuards(JwtAuthGuard)
    addFriend(@Request() req, @Param('id') id: ObjectId){
        return this.userService.addFriend(req, id);
    }

    @Get('/friends/requests')
    @UseGuards(JwtAuthGuard)
    getAllReq(@Request() req){
        return this.userService.getAllReq(req);
    }

    @Post('/friend/accepts/:id')
    @UseGuards(JwtAuthGuard)
    acceptReq(@Request() req, @Param('id') id: ObjectId){
        return this.userService.acceptReq(req, id);
    }

    @Delete('/friend/reject/:id')
    @UseGuards(JwtAuthGuard)
    rejectReq(@Request() req, @Param('id') id: ObjectId){
        return this.userService.rejectReq(req, id);
    }

    @Delete('/friend/:id')
    @UseGuards(JwtAuthGuard)
    deleteFriend(@Request() req, @Param('id') id: ObjectId){
        return this.userService.deleteFriend(req, id);
    }

    @Get('/dialogs')
    @UseGuards(JwtAuthGuard)
    getAllDialogs(@Request() req){
        return this.userService.getAllDialog(req);
    }
}
