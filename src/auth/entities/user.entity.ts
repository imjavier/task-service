import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User_data{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{unique:true, nullable:false})
    username: string;

    @Column('text',{nullable:false})
    password: string;
    
}