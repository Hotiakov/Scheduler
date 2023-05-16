import { TDateInterval } from 'src/common/types/dateInterval';

export class CreateUserDto {
  username: string;
  password: string;
  dayInterval: TDateInterval;
}
