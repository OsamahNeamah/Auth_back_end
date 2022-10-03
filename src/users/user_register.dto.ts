import { IsArray, IsBase64, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class UserRegisterRequestDto {

  @IsNotEmpty()
  name: string;

 
  @IsNotEmpty()
  @IsEmail()
  email: string;

 
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

 
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirm: string;

  @IsNotEmpty()
  @IsNumberString()
  age:number

  @IsNotEmpty()
  @IsString()
  adress:string

  @IsNotEmpty()
  photo:string
}