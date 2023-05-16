import { Grid } from '@mui/material';
import { FC } from 'react';

interface WeekDayTitleProps {
  date: Date
}

export const  WeekDayTitle: FC<WeekDayTitleProps> = ({date}) => {
  const weekDay = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
    return (
      <Grid container direction='column' sx={{
        textAlign: 'center',
        border: '1px solid',
        background: 'white',
      }}>
        <Grid item>
          {date.toLocaleDateString()}
        </Grid>
        <Grid item>
          {weekDay[date.getDay()]}
        </Grid>
      </Grid>
    );
}