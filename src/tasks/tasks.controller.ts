import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/dto/get-user.decorators';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id):Promise<Task>{
        return this.tasksService.getTaskById(id) 
    }

    @Delete('/:id')
    deleteTask(@Param('id') id):Promise<void>{
        return this.tasksService.deleteTask(id)
    }

    @Post()
    createTask(@Body()createTaskDto:CreateTaskDto, @GetUser() user:User): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id, @Body() updateTaskStatusDto: UpdateTaskStatusDto):Promise<Task>{
        const {status} = updateTaskStatusDto
        console.log(updateTaskStatusDto)
        return this.tasksService.updateTaskStatus(id, status)
    }
} 
