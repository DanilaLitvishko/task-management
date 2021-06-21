import { IsEnum, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status";

export class UpdateTaskStatusDto{
    
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus
}