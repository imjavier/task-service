import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTaskDto:CreateTaskDto, @Req()req) {
    console.log(req.user)
    const task={
      ...createTaskDto,
      userID:req.user.id
    }
    return this.taskService.create(task);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req()req) {
  
    return this.taskService.findAll(req.user.id);  
  }

 
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto,@Req()req) {
    const userID=req.user.id;
    return this.taskService.update(id, updateTaskDto,userID);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id',ParseUUIDPipe) id: string, @Req()req) {
    const userID=req.user.id;
    return this.taskService.remove(id, userID);
  }
}
