import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  accesstoken: string;
}