import { UserService } from './users.service';
import { UserController } from './users.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { LocalStrategy } from 'src/auth/local.strategy.guard';
import { RegisterStrategy } from './register.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        PassportModule,
         JwtModule.registerAsync(jwtConfig)
    ],
    controllers: [
        UserController,],
    providers: [
        UserService, AuthService, LocalStrategy, RegisterStrategy],
})
export class UsersModule { }
