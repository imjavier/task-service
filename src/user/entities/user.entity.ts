import { Task } from "src/task/entities/task.entity";
import { BeforeRemove, Column, Entity, OneToMany, PrimaryGeneratedColumn, getRepository } from "typeorm";

@Entity()
export class User_data{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{unique:true, nullable:false})
    username: string;

    @Column('text',{nullable:false})
    password: string;

    @Column('text',{nullable:false, default:'user'})
    rol: string;
    
    @OneToMany(()=> Task,(task)=>task.user_data )
    tasks:Task[];
     
 
     
}
