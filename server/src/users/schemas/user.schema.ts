import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  TDateInterval,
  DateIntervalSchema,
} from 'src/common/types/dateInterval';
import { Task } from 'src/tasks/schemas/task.schema';

export type UserDocument = User & Document;

export interface IUser {
  username: string;
  dayStart: TDateInterval;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: DateIntervalSchema, _id: false, required: true })
  dayInterval: TDateInterval;

  @Prop()
  refreshToken: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
