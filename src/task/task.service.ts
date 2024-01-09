import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) 
    private readonly taskRepository: Repository<Task>
  ){}

  async create( createTaskDto: CreateTaskDto) {

    try{

      const task = this.taskRepository.create(createTaskDto);
      const taskCreated = await this.taskRepository.save(task);
      return `Task ${task.taskname} created`;
    
    }catch(error){

      this.handleDBErrors(error);   
   
    }
  }

  findAll(userID:string) {
     
    return this.taskRepository.find({where:{userID}});
  }

  async findOne(id: string) {

    const taskData = await this.taskRepository.findOneBy({id});
    if(!taskData) throw new NotFoundException('Task not found');
    return taskData;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
     
    const task= await this.taskRepository.preload({
      id,
      ...updateTaskDto
    });
    if(!task) throw new NotFoundException(`Task with id "${id} not exist"`)

    try{
      return await this.taskRepository.save(task);

    }catch(error){
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const task= await this.findOne(id)
    return this.taskRepository.remove(task);
  }

  private handleDBErrors(error:any){
 
    if(error.code=='23503') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Revisar logs');

    

  }
}
