import { Grid } from "@mui/material";
import { getScheduleInterval } from "entities/Shedule";
import { filterTasksByDate, getTasks } from "entities/Task";
import { getUserDayInterval } from "entities/User";
import { FC } from "react";
import { useSelector } from "react-redux";
import { generateMonthDays } from "shared/lib/generateMonthDays/generateMonthDays";
import { DayTask } from "widgets/DayTask";

interface WeekCalendarProps{
}

export const WeekCalendar: FC<WeekCalendarProps> = () => {
  const tasks = useSelector(getTasks);
  const dateInterval = useSelector(getScheduleInterval);
  return (
    <Grid item xs={11} container
      sx={{
        display: 'grid', 
        gridTemplateRows: `repeat(96, 20px)` ,
        gridTemplateColumns: `repeat(7, 1fr)`,
      }}
      columnGap={1}
    >
      {
        generateMonthDays(new Date(dateInterval.from), new Date(dateInterval.to))
          .map((item, index) => (
            filterTasksByDate(item, tasks).map(task => (
              <DayTask 
                key={task['_id']} 
                task={task}
                column={index + 1}
                isFullVersion={false}
              />)
            )
        ))
      }
    </Grid>
  )
};