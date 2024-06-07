import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
dotenv.config();

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: '30d'},
      }),
      inject: [ConfigService],
    }),
],
    
  providers: [AuthService, LocalStrategy, JwtStrategy,],
  controllers: [AuthController]
})
export class AuthModule {}
