import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User_data{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{unique:true, nullable:false})
    username: string;

    @Column('text',{nullable:false})
    password: string;
    
    @OneToMany(()=> Task,(task)=>task.user_data)
    tasks:Task[];
    
}