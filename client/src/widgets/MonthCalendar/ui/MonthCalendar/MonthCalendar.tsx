import { Grid } from '@mui/material';
import { getScheduleInterval } from 'entities/Shedule';
import { filterTasksByDate, getTasks } from 'entities/Task';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { generateMonthDays } from 'shared/lib/generateMonthDays/generateMonthDays';
import { MonthDay } from '../MonthDay/MonthDay';


interface MonthCalendarProps {
   className?: string;
}

export const MonthCalendar: FC<MonthCalendarProps> = ({className}) => {
    const tasks = useSelector(getTasks);
    const scheduleInterval = useSelector(getScheduleInterval);

    return (
      <Grid 
        container 
        columns={14} 
        rowSpacing={1} 
        columnSpacing={1}
        gridAutoRows={1}
        alignItems='stretch'
      >
        {generateMonthDays(scheduleInterval.from, scheduleInterval.to)
          .map((date: Date) => (
            <MonthDay
              key={date.toISOString().split('T')[0]}
              date={date}
              dayTasks={
                filterTasksByDate(date, tasks)
              }
            />
        ))}
      </Grid>
    );
}