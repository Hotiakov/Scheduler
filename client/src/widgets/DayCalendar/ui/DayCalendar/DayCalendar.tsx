import { Grid } from "@mui/material";
import { getTasks } from "entities/Task";
import { FC } from "react";
import { useSelector } from "react-redux";
import { DayTask } from "widgets/DayTask";

interface DayCalendarProps{
}

export const DayCalendar: FC<DayCalendarProps> = () => {
  const tasks = useSelector(getTasks);
  return (
    <Grid item xs={10} container
      sx={{
        display: 'grid', 
        gridTemplateRows: `repeat(96, 20px)` ,
        gridTemplateColumns: 'repeat(auto-fill, 33%)',
      }}
      columnGap={1}
    >
      {tasks.map(task => <DayTask key={task['_id']}
 task={task}/>)}
    </Grid>
  )
};