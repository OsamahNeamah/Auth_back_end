import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  import { UserService } from '../users/users.service';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService,
    ) {}
  
    async validateUserCreds(email: string, password: string): Promise<any> {
      
      return await this.userService.getUserByEmail(email).then(async data=>{
        if (!data) throw new BadRequestException();
         bcrypt.compare(password, data.password ).then(data=>{
          return data
        })
        return data
    })
  }
  
    generateToken(user: any) {
      return {
        access_token: this.jwtService.sign({
          email: user.email,
          name:user.name
        }),
      };
    }
  }