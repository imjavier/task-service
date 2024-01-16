import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTaskDto:CreateTaskDto, @Req()req) {
    console.log(req.user)
    const task={
      ...createTaskDto,
      userID:req.user.id
    }
    return this.taskService.create(task);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Req()req) {
  
    return this.taskService.findAll(req.user.id);  
  }

 
  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto,@Req()req) {
    const userID=req.user.id;
    return this.taskService.update(id, updateTaskDto,userID);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id',ParseUUIDPipe) id: string, @Req()req) {
    const userID=req.user.id;
    return this.taskService.remove(id, userID);
  }
}
