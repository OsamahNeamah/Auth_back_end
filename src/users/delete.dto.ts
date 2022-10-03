import { IsEmail, IsNotEmpty } from "class-validator";

export class DeleteRequestDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;
}