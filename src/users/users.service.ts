import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './user_register.dto';
import { Users } from './users.entity';
import { UserUpdateRequestDto } from './user_update.dto';

@Injectable()
export class UserService {
  doUserUpdate(email,userUpdate: UserUpdateRequestDto) {
    return Users.update({email},userUpdate)
  }
  deleteUser(email) {
    return Users.delete( email  )
  }
  getAllUsers() {
    return Users.find();
  }
  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
  ): Promise<Users|any> {
    let dbuser:any=[]
    await this.getUserByEmail(userRegister.email).then(data=>{ 
      dbuser=data
    })
    const user = new Users();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    user.adress = userRegister.adress;
    user.age = userRegister.age;
    user.photo = userRegister.photo; 
    if(dbuser && dbuser.email===user.email){throw new BadRequestException()}
    await user.save().then(data=>{dbuser=data})
    return dbuser
  }

  async getUserByEmail(email: string): Promise<Users | undefined> {
    return Users.findOne({ where: {  email } });
  }

  async getUserById(id: number): Promise<Users | undefined> {
    return Users.findOne({ where: { id } });
  }
}

