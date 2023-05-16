import { Schema } from 'mongoose';

export const DateIntervalSchema = new Schema({
  from: Date,
  to: Date,
});

export type TDateInterval = {
  from: Date;
  to: Date;
};
