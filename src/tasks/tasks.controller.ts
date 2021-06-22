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
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService, private configService:ConfigService){
        configService.get('TEST_VALUE')
    }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user:User): Promise<Task[]>{
        this.logger.verbose(`User "${user.username}" retrieving tasks`)
        return this.tasksService.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTaskById(@Param('id') id, @GetUser() user:User):Promise<Task>{
        return this.tasksService.getTaskById(id, user) 
    }

    @Delete('/:id')
    deleteTask(@Param('id') id, @GetUser() user:User):Promise<void>{
        return this.tasksService.deleteTask(id, user)
    }

    @Post()
    createTask(@Body()createTaskDto:CreateTaskDto, @GetUser() user:User): Promise<Task>{
        this.logger.verbose(`User "${user.username}" create a new task. `)
        return this.tasksService.createTask(createTaskDto, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user:User):Promise<Task>{
        const {status} = updateTaskStatusDto
        console.log(updateTaskStatusDto)
        return this.tasksService.updateTaskStatus(id, status, user)
    }
} 
