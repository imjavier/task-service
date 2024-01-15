import { User_data } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{nullable:false})
    taskname: string;

    @Column('text', {nullable:true})
    description: string;

    @Column('text', {nullable:false})
    status: string;

    @Column('date', {default:()=>'CURRENT_TIMESTAMP'})
    creationDate: Date;

    @Column('uuid')
    userID:string
    
    @ManyToOne(()=>User_data,(user_data)=>user_data.tasks, {onDelete:'CASCADE'})
    @JoinColumn({name:'userID'})
    user_data:User_data;    


}
