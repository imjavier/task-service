import { IsIn, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {

    @IsString()
    taskname:string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsIn(['Por hacer','En proceso', 'Hecho'])
    status:string;
    //Temporalmente se recibirá el userID para luego recibirlo por el JWT
    @IsUUID()
    userID:string;
}
