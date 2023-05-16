import { Button, Checkbox, Grid, Typography } from '@mui/material';
import { ITask, tasksActions } from 'entities/Task';
import { distributeAction } from 'features/DistributeTask';
import { FC } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

interface UnplannedTaskProps {
  task: ITask;
  checked: boolean;
}

export const  UnplannedTask: FC<UnplannedTaskProps> = ({task, checked}) => {
  const {setCurrentTask} = tasksActions;
  const {setDistributeTask} = distributeAction;
  const dispatch = useAppDispatch();
  const dateTime = new Date(task.duration);

  const handleChecked = (value: boolean) => {
    dispatch(setDistributeTask({
      taskId: task._id, 
      checked: value
    }));
  };

  return (
    <Grid position='relative' 
      sx={{
        flex: '0 0 32%',
        borderRadius: '4px',
        background: task.color,
        border: '1px solid gray',
        padding: '5px',
      }}
    >
      <Grid sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        position: 'absolute',
        top: 10,
        right: 10,
      }}>
        <Button 
          variant='contained' 
          size='small' 
          onClick={() => {
            dispatch(setCurrentTask(task));
          }} 
        >
          <DisplaySettingsIcon />
        </Button>
        <Checkbox 
          checked={checked}
          onChange={e => handleChecked(e.target.checked)}
        />
      </Grid>
      <Typography variant="h6" marginBottom={2}>
        Название: {task.name}
      </Typography>
      <Grid display='flex' alignItems='center' justifyContent='space-between' width='100%'>
        <Typography variant='caption'>
          Длительность: {dateTime.toLocaleTimeString([], {timeStyle: 'short'})}
        </Typography>
        {
          task.deadline && (
            <Typography variant='caption'>
              Дедлайн: {new Date(task.deadline).toLocaleDateString()}
            </Typography>
          )
        }
      </Grid>
      <Typography variant='body2'>
        Описание: {task.description ? `${task.description.slice(0, 100)}...` : '-'}
      </Typography>
    </Grid>
  );
}