import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {

    
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}
