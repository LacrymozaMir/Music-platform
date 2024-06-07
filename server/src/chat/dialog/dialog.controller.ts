import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { DialogService } from "./dialog.service";
import { ObjectId } from "mongoose";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateMessageDto } from "../message/message.dto";


@Controller('/dialog')
export class DialogController {
    constructor (private readonly dialogService: DialogService) {}

    @Post(':id')
    @UseGuards(JwtAuthGuard)
    create(@Param('id') id: ObjectId, @Request() req){
        return this.dialogService.create(id, req);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(@Request() req){
        return this.dialogService.getAll(req);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOne(@Param('id') id: ObjectId){
        return this.dialogService.getOne(id);
    }

    // V.1
    //req = userOne
    //? = dialog
    //id = userTwo

    // V.2
    //req = userOne
    //id_dialog = dialog
    //id_userTwo = userTwo

    @Post('sendMessage/:id')
    @UseGuards(JwtAuthGuard)
    sendMessage(@Param('id') id: ObjectId, @Request() req, @Body() dto: CreateMessageDto){
        return this.dialogService.sendMessage(id, req, dto);
    }

    @Get('/allmessage/:id')
    @UseGuards(JwtAuthGuard)
    getAllMessages(@Param('id') id: ObjectId){
        return this.dialogService.getAllMessage(id);
    }

}
