import { Button, Grid, Typography } from '@mui/material';
import { ITask, tasksActions } from 'entities/Task';
import { FC } from 'react';
import { calcEndTime } from 'shared/lib/calcEndTime/calcEndTime';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';


interface DayTaskProps {
  task: ITask;
  column?: number;
  isFullVersion?: boolean;
}

const weekStyle = {
  display: 'flex',
  gap: '5px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const dayStyle = {
  display: 'block'
}

const descriptionStyle = {
  flex: '1 1 100%',
  lineHeight: 1.5,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxHeight: '100%',
  '-webkit-line-clamp': '3',
  '-webkit-box-orient': 'vertical',
}

const timeStyle = {
  minWidth: 'fit-content',
  fontSize: '12px',
  lineHeight: 1.5,
}

const titleStyle = {
  fontSize: '16px',
  lineHeight: 1.5,
}

const changeBtnStyle = {
  flex: '0 0 auto',
}

const wrapperStyle = {
  display: 'flex',
  columnGap: '10px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid gray',
}

export const DayTask: FC<DayTaskProps> = ({task, column, isFullVersion = true}) => {
  const dispatch = useAppDispatch();
  const {setCurrentTask} = tasksActions;

  const {repeatability, duration } = task;
  const {time} = repeatability || {};
  const durationDate = new Date(duration);
  const timeDate = new Date(time);

  const endTime = calcEndTime(timeDate, durationDate);
  const startHour = timeDate.getHours();
  const startMinute = timeDate.getMinutes();
  const endHour = endTime.getHours();
  const endMinute = endTime.getMinutes();
  const startSlot = startHour * 60 + startMinute;
  const endSlot = endHour * 60 + endMinute;
  const startGridRow = Math.floor(startSlot / 15) + 1;
  const endGridRow = Math.ceil(endSlot / 15) + 1;

  return (
    <Grid
      item
      sx={{ 
        gridRow: `${startGridRow} / ${endGridRow}`, 
        backgroundColor: task.color,
        alignItems: isFullVersion ? 'flex-start' : 'initial',
        justifyContent: isFullVersion ? 'initial' : 'flex-end',
        gridColumn: column ? `${column} / ${column + 1}` : 'auto',
        zIndex: 1440-endSlot,
        ...wrapperStyle,
        flexDirection: isFullVersion ? 'row' : 'column',

      }}>
      <Grid sx={{
        flex: '1 0 10%',
        minWidth: 'fit-content',
        ...(isFullVersion ? dayStyle : weekStyle)
      }}>
        <Typography variant="h6" sx={titleStyle}>
          {isFullVersion && 'Название:'} {task.name}
        </Typography>
        <Typography 
          variant="caption"
          sx={timeStyle}
        >
          {isFullVersion && 'Время:'} {timeDate.toLocaleTimeString([], {timeStyle: 'short'})} 
          - 
          {endTime.toLocaleTimeString([], {timeStyle: 'short'})}
        </Typography>
      </Grid>
      { isFullVersion 
        && <Typography variant="body2" sx={descriptionStyle}>
          Описание: {task.description || '-'}
        </Typography> 
      }
      <Button 
        variant='contained' 
        size='small' 
        onClick={() => {
          dispatch(setCurrentTask(task));
        }} 
        sx={changeBtnStyle}
      >
        <DisplaySettingsIcon />
      </Button>
    </Grid>
  );
}