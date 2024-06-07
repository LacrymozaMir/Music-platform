import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService, 
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(name: string, password: string) {
        const user = await this.userService.findOne(name);
        const passwordIsMatch = argon2.verify(user.password, password)
        if (user && passwordIsMatch) {
            return user;
        } 
        throw new BadRequestException('User or password are incorrect.');
      }
    
    async login(user: IUser) {
        const {id, name} = user
        return {
            id, 
            name, 
            token: this.jwtService.sign({id: user.id, name: user.name}),
        }
    }
}
