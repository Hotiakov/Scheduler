import { Box, Grid, Typography } from "@mui/material";
import { ITask } from "entities/Task";
import { FC } from "react";
import { MonthTask } from "../MonthTask/MonthDay";

interface MonthDayProps {
  date: Date,
  dayTasks: ITask[],
}

export const MonthDay: FC<MonthDayProps> = ({ date, dayTasks }) => {
  return (
    <Grid item xs={2}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 2,
        border: '1px solid black',
        padding: '10px',
        height: '100%'
      }} >
        <Typography variant="h6">{date.getDate()}</Typography>
        {dayTasks.map((task) => (
          <MonthTask task={task} key={task._id}/>
        ))}
      </Box>
    </Grid>
  );
};
