import { Grid } from '@mui/material';
import { getScheduleInterval } from 'entities/Shedule';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { generateMonthDays } from 'shared/lib/generateMonthDays/generateMonthDays';
import { WeekDayTitle } from '../WeekDayTitle/WeekDayTitle';

interface WeekDaysProps {
}
export const  WeekDays: FC<WeekDaysProps> = () => {
  const days = useSelector(getScheduleInterval);

  return (
      <Grid container sx={{
        position: 'sticky',
        top: '60px',
        zIndex: 999,
      }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={11} sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(7, 1fr)`,
        }} columnGap={1}>
          {
            generateMonthDays(days.from, days.to)
              .map(item => (
                <WeekDayTitle
                  key={item.toISOString()}
                  date={item}
                />
              ))
          }
        </Grid>
      </Grid>
  );
}