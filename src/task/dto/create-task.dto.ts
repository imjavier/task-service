import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    taskname:string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsIn(['Por hacer','En proceso', 'Hecho'])
    status:string;
    //Temporalmente se recibirá el userID para luego recibirlo por el JWT
    @IsUUID()
    @IsNotEmpty()
    userID:string;
}
