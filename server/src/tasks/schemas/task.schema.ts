import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  PreferredTaskTime,
  PreferredTaskTimeSchema,
} from 'src/common/types/preferredTaskTime';
import {
  RepeatSchedule,
  RepeatScheduleSchema,
} from 'src/common/types/repeatability';
import { User } from 'src/users/schemas/user.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  duration: Date;

  @Prop()
  importance: number;

  @Prop()
  description: string;

  @Prop()
  color: string;

  @Prop({ type: PreferredTaskTimeSchema, _id: false })
  preferredTaskTime: PreferredTaskTime;

  @Prop()
  deadline: Date;

  @Prop({ type: RepeatScheduleSchema, _id: false })
  repeatability: RepeatSchedule;

  @Prop()
  isInShedule: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export interface ITask {
  _id?: string;
  name: string;
  duration: Date;
  importance?: number;
  isInShedule: boolean;
  description?: string;
  color?: string;
  deadline?: Date;
  preferredTaskTime?: PreferredTaskTime;
  repeatability?: RepeatSchedule;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
