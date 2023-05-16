import { Dayjs } from "dayjs";
import { IDateInterval } from "shared/types/dateInterval";

export interface User {
  username: string;
  dayInterval: IDateInterval;
  dayDuration?: Dayjs;
};

export interface UserSchema{
  userInfo?: User;
  isLoading: boolean;
  error?: string;
};
