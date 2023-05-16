import { Box, Button, Grid, Typography } from '@mui/material';
import { ITask, tasksActions } from 'entities/Task';
import { FC } from 'react';
import { calcEndTime } from 'shared/lib/calcEndTime/calcEndTime';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface MonthTaskProps {
   task: ITask;
}

const updateBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: 1,
}

export const MonthTask: FC<MonthTaskProps> = ({task}) => {
    const startTime = new Date(task.repeatability.time);
    const duration = new Date(task.duration);
    const endTime = calcEndTime(startTime, duration);
    const {setCurrentTask} = tasksActions;
    const dispatch = useAppDispatch();

    return (
      <Grid sx={{
        borderRadius: 2,
      }}>
        <Button fullWidth variant='text' color='inherit' sx={{
          ...updateBtnStyle,
          backgroundColor: task.color,
        }} onClick={() => {
          dispatch(setCurrentTask(task));
        }}>
          <Typography variant="body2">{task.name}</Typography>
          <Typography variant="caption">
            {`${startTime.getHours()}`.padStart(2, "0")}:{`${startTime.getMinutes()}`.padStart(2, "0")}
              -
            {`${endTime.getHours()}`.padStart(2, "0")}:{`${endTime.getMinutes()}`.padStart(2, "0")}
          </Typography>
        </Button>
      </Grid>
    );
}