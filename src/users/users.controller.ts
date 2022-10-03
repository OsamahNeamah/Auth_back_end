import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SETTINGS } from 'src/app.utils';

import { UserRegisterRequestDto } from './user_register.dto';
import { Users } from './users.entity';
import { UserService } from './users.service';
import { RegisterStrategy } from './register.guard';
import { Http2ServerResponse } from 'http2';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { DeleteRequestDto } from './delete.dto';
import { UserUpdateRequestDto } from './user_update.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private RegisterStrategy: RegisterStrategy) { }

  @Get()
  sayHello() { return "Hello User" }

  @UseGuards(RegisterStrategy)
  @UsePipes(ValidationPipe)
  @Post('/register')
  async doUserRegistration(
    @Body()
    userRegister: UserRegisterRequestDto,
  ): Promise<Users | any> {
    let result: any = ''
    await this.userService.doUserRegistration(userRegister).then(data => {
      if (data == BadRequestException) { result = data }
      else if (data.email) { result = { "message": "new user added" } }
    })
    return result
  }

  @Get('/users')
  async getUsers() {
    return await this.userService.getAllUsers()
  }

  @Delete('/delete')
  async DeleteUsers(@Body()
  userDelete: DeleteRequestDto,) {
    console.log(userDelete)
    return await this.userService.deleteUser(userDelete)
  }

  @Patch(':email')
  async doUserupdate(
    @Param('email') email: string,
    @Body()
    userUpdate: UserUpdateRequestDto
  ): Promise<Users | any> {
    console.log("any")
    await this.userService.doUserUpdate(email,userUpdate)
  }
}

