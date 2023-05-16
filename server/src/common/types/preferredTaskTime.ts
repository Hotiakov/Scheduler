import { Schema } from 'mongoose';

export const PreferredTaskTimeSchema = new Schema({
  before: Date,
  after: Date,
});

export interface PreferredTaskTime {
  before?: Date;
  after?: Date;
}
