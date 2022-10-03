import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import jwt_decode, { InvalidTokenError } from "jwt-decode";
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private usersService:UserService) {
        super();
      }

      async canActivate(context: ExecutionContext): Promise<boolean|any>{
        const request = context.switchToHttp().getRequest();
        if((Date.now()-(jwt_decode(request.body.accesstoken)['exp'])*1000)>0){throw new UnauthorizedException()} 
        return this.usersService.getUserByEmail(request.body.email).then(data=>{
            if(!data){throw new BadRequestException()}
            return true
        })
        
      }
}