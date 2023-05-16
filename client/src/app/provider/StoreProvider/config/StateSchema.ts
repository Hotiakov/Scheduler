import { UserSchema } from "entities/User";
import { SignUpSchema } from "features/Auth/SignUpByUsername";
import { LoginSchema } from "features/Auth/AuthByUsername";
import { ScheduleSchema } from "entities/Shedule";
import { TaskSchema } from "entities/Task";
import { CreateTaskSchema } from "features/CreateTask";
import { DistributeTaskSchema } from "features/DistributeTask";

export interface StateSchema {
    user: UserSchema;
    loginForm?: LoginSchema;
    signUpForm?: SignUpSchema;
    schedule: ScheduleSchema;
    task: TaskSchema;
    createTaskForm: CreateTaskSchema;
    distributeTask: DistributeTaskSchema;
}

