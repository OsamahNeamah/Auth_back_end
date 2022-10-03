import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginDto } from './login.dto';
  import { JwtAuthGuard } from './jwt.auth.guard';
import { LocalStrategy } from './local.strategy.guard';
import { UserService } from 'src/users/users.service';
import { GetUser } from './getuser.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService, 
      private readonly localStrategy:LocalStrategy,
      private readonly userService:UserService
      ) {}
  
    @UseGuards(LocalStrategy)
    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() LoginDto:LoginDto): Promise<any> {
      return await  this.authService.generateToken(LoginDto)
    }
  
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Get('user')
    async user(@Body() getUser:GetUser): Promise<any> {
      return await  this.userService.getUserByEmail(getUser.email)
    }
  }