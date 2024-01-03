import { IsString, IsUUID } from "class-validator";

export class CreateUserDTO{
 

    @IsString()
    username:string;

    @IsString()
    password: string
    
}