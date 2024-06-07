import { Module } from "@nestjs/common";
import { DialogController } from "./dialog.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Dialog, DialogSchema } from "./dialog.schema";
import { DialogService } from "./dialog.service";
import { Message, MessageSchema } from "../message/message.schema";
import { UserModule } from "src/user/user.module";
import { User, UserSchema } from "src/user/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Dialog.name, schema: DialogSchema},]),
        MongooseModule.forFeature([{name: Message.name, schema: MessageSchema},]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema},]),
        
  ],
    providers: [DialogService],
    controllers: [DialogController],
    exports: [DialogService],
  })
  export class DialogModule {}
  