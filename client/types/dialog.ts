import { IUserList } from "./userData";

export interface IDialog{
    _id: string;
    userOne: IUserList[];
    userTwo: IUserList[];
    messages: IMessage[];
}

export interface IMessage {
    _id: string;
    userOne: IUserList[];
    userTwo: IUserList[];
    text: string;
    mesTime: Date;
}