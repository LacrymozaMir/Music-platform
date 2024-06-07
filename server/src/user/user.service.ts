import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { Track, TrackDocument } from 'src/track/schemas/track.schema';
import { Playlist, PlaylistDocument } from 'src/playlist/playlist.schema';
import { DialogService } from 'src/chat/dialog/dialog.service';
import { FriendRequest, friendRequestDocument } from './friendRequest/friendRequest.schema';
import { Dialog, DialogDocument } from 'src/chat/dialog/dialog.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
        @InjectModel(FriendRequest.name) private friendRequestModel: Model<friendRequestDocument>,
        @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>,
        private readonly jwtService: JwtService,
        private readonly dialogService: DialogService, 
    ) {}

    async create(dto: CreateUserDto) {
        const existUser = await this.userModel.findOne({
            name: dto.name,
        })
        if (existUser) throw new BadRequestException('This username already exist.')

        const user = await this.userModel.create({
            name: dto.name, 
            password: await argon2.hash(dto.password),
        })

        const token = this.jwtService.sign({name: dto.name})

        return {user, token};
    }

    async findOne(name:string) {
        return (await this.userModel.findOne({name: name}));
    }

    async addTrack(id: ObjectId, req) {
        const user = await this.userModel.findById(req.user.id);
        const track = await this.trackModel.findById(id);
        (await user).addedTracks.push((await track)._id);
        (await user).save();
        return user;
    }

    async addPlaylist(id: ObjectId, req) {
        const user = await this.userModel.findById(req.user.id);
        const playlist = await this.playlistModel.findById(id);
        (await user).addedPlaylists.push((await playlist)._id);
        (await user).save();
        return user;
    }

    async getTracks(req){
        const user = (await this.userModel.findById(req.user.id)).populate(['addedTracks']);
        return (await user).addedTracks;
    }

    async getPlaylists(req){
        const user = (await this.userModel.findById(req.user.id)).populate(['addedPlaylists']);
        return (await user).addedPlaylists;
    }

    async deleteTrack(id: ObjectId, req) {
        const user = await this.userModel.findById(req.user.id);
        const track = await this.trackModel.findById(id);
        const index = await user.addedTracks.indexOf(track._id);
        await user.addedTracks.splice(await index, 1);
        (await user).save();

        // return await user.addedTracks.filter(await (userTrack => userTrack !== track._id));;
        return await user.addedTracks;
    }

    async getAll(){
        const users = await this.userModel.find({}, {name: true});
        return await users;
    }
    
    async getDataOne(id: ObjectId){
        const user = await this.userModel.findById(id).populate(['addedTracks', 'addedPlaylists']);
        return user;
    }

    async getAllFriends(req){
        const user = await this.userModel.findById(req.user.id).populate('friends');
        return await user.friends;
    }

    async addFriend(req, id: ObjectId){
        const userOne = await this.userModel.findById(req.user.id);
        const userTwo = await this.userModel.findById(id);
        const requestFriend = await this.friendRequestModel.create({sender: userOne._id, receiver: userTwo._id, status: 'pending'});
        requestFriend.save();
        return requestFriend;
    }

    async acceptReq(req, id: ObjectId) {
        const requestFriend = await this.friendRequestModel.findById(id);
        const userOne = await this.userModel.findById(requestFriend.sender);
        const userTwo = await this.userModel.findById(requestFriend.receiver);
        await userOne.friends.push(userTwo._id);
        await userTwo.friends.push(userOne._id);
        await userOne.save();
        await userTwo.save();
        await this.friendRequestModel.findByIdAndDelete(id);
        const dialog = await this.dialogModel.findOne({$or : [{userOne: userOne._id, userTwo: userTwo._id}, {userOne: userTwo._id, userTwo: userOne._id}]})
        if (!dialog) {
            await this.dialogService.create(userOne._id, req);
        }
        return userTwo.friends;
    }

    async rejectReq(req, id: ObjectId){
        const requestFriend = await this.friendRequestModel.findByIdAndDelete(id);
        return requestFriend;
    }

    async getAllReq(req){
        const user = await this.userModel.findById(req.user.id);
        const rqfr = await this.friendRequestModel.find({receiver: user._id}).populate('sender');
        return rqfr;
    }

    async getAllDialog(req){
        const user = await this.userModel.findById(req.user.id).populate('dialogs');
        return await user.dialogs;
    }

    async canFriend(req){
        const user = (await this.userModel.findById(req.user.id)).populate('friends')
        // const rqfc = await this.friendRequestModel.find({sender: req.user.id}).populate('sender');
        const users = await this.userModel.find({
            $and: [
                {name: { $nin: (await user).friends.map(friend => friend.name), $ne: req.user.name}},
                // {name: {$nin: await rqfc.map(rq => rq.sender.name)}}
            ]
          });
        return users;
    }

    async deleteFriend(req, id: ObjectId) {
        const userOne = (await this.userModel.findById(req.user.id));
        const userTwo = await this.userModel.findById(id);
        const indexOne = await userOne.friends.indexOf(userTwo._id);
        await userOne.friends.splice(await indexOne, 1);
        (await userOne).save();
        const indexTwo = await userTwo.friends.indexOf(userOne._id);
        await userTwo.friends.splice(await indexTwo, 1);
        (await userTwo).save();
    }
}
