import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { Dialog, DialogDocument } from "./dialog.schema";
import { Message, MessageDocument } from "../message/message.schema";

@Injectable()
export class DialogService {
    constructor(
        @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    async create(id: ObjectId, req) {
        const userTwo = await this.userModel.findById(id);
        const userOne = await this.userModel.findOne({name: req.user.name})
        const dialog = (await this.dialogModel.create({userOne: userOne._id, userTwo: (await userTwo)._id, messages: []}));
        await userOne.dialogs.push(dialog);
        await userTwo.dialogs.push(dialog);
        await userOne.save();
        await userTwo.save();
        return dialog;
    }

    async getAll(req){
        return await this.dialogModel.find({$or : [{userOne: req.user.id}, {userTwo: req.user.id}]}).populate(['messages', 'userOne', 'userTwo']);
    }
// {userOne: userOne._id, userTwo: userTwo._id}
    async getOne(id: ObjectId){
        return (await this.dialogModel.findById(id)).populate(['messages', 'userOne', 'userTwo']);
    }

    async sendMessage(id: ObjectId, req, dto){
        const userOne = await this.userModel.findOne({name: req.user.name});
        const userTwo = await this.userModel.findById(id);
        const dialog = await this.dialogModel.findOne({$or : [{userOne: userOne._id, userTwo: userTwo._id}, {userOne: userTwo._id, userTwo: userOne._id}]}).populate('messages');
        // const dateNow = Date.now();
        const mess = await this.messageModel.create({...dto, userOne: userOne._id, userTwo: userTwo._id, mesTime: Date.now() ,dialog: (await dialog)._id});
        (await dialog).messages.push(mess);
        (await dialog).save()
        await mess.save();
        return (await dialog).messages;
    }

    async getAllMessage(id: ObjectId) {
        const dialog = (await this.dialogModel.findById(id)).populate('messages');
        return (await dialog).messages;
    }
}