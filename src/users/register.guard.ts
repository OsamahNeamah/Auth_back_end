import { BadRequestException, Body, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PassThrough } from 'stream';
import { AuthService } from '../auth/auth.service';
import { UserRegisterRequestDto } from './user_register.dto';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request:UserRegisterRequestDto = context.switchToHttp().getRequest().body;
    if(!(request.adress && request.age && request.confirm && request.email && request.name && request.password && request.photo)){
      throw new BadRequestException({"message":"Please fill all the required fields"}) 
    }
    
    return true
  }
}