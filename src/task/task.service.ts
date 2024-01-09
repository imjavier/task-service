import { BadRequestException, Injectable } from '@nestjs/common';
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
    }catch(error){
      
      if(error.code=='23503') throw new BadRequestException(error.detail);
        
    }
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
