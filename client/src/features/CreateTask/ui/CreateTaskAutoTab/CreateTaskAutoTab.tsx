import { Box, FormControl, Grid, InputLabel, Slider, Tooltip, Typography } from '@mui/material';
import { DateRange, DateTimePicker, MultiInputTimeRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { createTaskActions } from 'features/CreateTask';
import { getCreateTaskForm } from 'features/CreateTask/model/selectors/getCreateTask';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { TabPanel } from 'shared/ui/TabPanel/TabPanel';


interface CreateTaskAutoTabProps {
  value: number;
}

export const CreateTaskAutoTab: FC<CreateTaskAutoTabProps> = ({value}) => {
  const dispatch = useAppDispatch();
  const {
    preferredTaskTime, 
    deadline,
    importance
  } = useSelector(getCreateTaskForm);
  
  const {
    setDeadline, 
    setPreferredTaskTime, 
    setImportance
  } = createTaskActions;

  const handleChangePreferred = (value: DateRange<Dayjs>) => {
    dispatch(setPreferredTaskTime({
      before: value[1]?.toDate() ?? null,
      after: value[0]?.toDate() ?? null
    }));
  }

  const handleChangeImportance = (e: Event, newValue: number) => {
    dispatch(setImportance(newValue));
  }

  const handleChangeDeadline = (value: Dayjs) => {
    dispatch(setDeadline(value.toDate()));
  }

  const preferredTaskTimeValue = useMemo(() => {
    return [
      preferredTaskTime?.after ? dayjs(preferredTaskTime?.after) : null, 
      preferredTaskTime?.before ? dayjs(preferredTaskTime?.before) : null 
    ] as DateRange<Dayjs>;
  }, [preferredTaskTime])

  return (
    <TabPanel label='task' index={1} value={value}>
      <Grid container sx={{
        gap: 2,
        width: '100%',
      }}>
        <Grid item xs={12}>
          <Grid alignItems='center' gap={2} justifyContent='space-between' display='flex'>
            <InputLabel required id='importance-lable'>Приоритетность задачи
            </InputLabel>
            <Tooltip title='Задачи с более высоким приоритетом будут находиться раньше в расписании'>
              <InfoOutlinedIcon/>
            </Tooltip>
          </Grid>
          <FormControl fullWidth>
            <Slider 
              aria-label='Важность'
              value={importance}
              onChange={handleChangeImportance}
              min={1}
              max={10}
              step={1}
              color='secondary'
              valueLabelDisplay='auto'
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DateTimePicker
            label='Дата дедлайна(опц.)'
            value={deadline ? dayjs(deadline) : null}
            onChange={handleChangeDeadline}
            sx={{
              width: '100%'
            }}
            minDate={dayjs(new Date())}
            minDateTime={dayjs(new Date())}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid alignItems='center' gap={2} justifyContent='space-between' display='flex'
           sx={{
            marginBottom: 2
          }}>
            <InputLabel>Предпочитаем время задачи(опц.)</InputLabel>
            <Tooltip title='Автораспределение будет учитывать пожелание в предпочтительном времение начала задачи. Например, начало до 17:00 или после 12:00'>
              <InfoOutlinedIcon/>
            </Tooltip>
          </Grid>
          <FormControl fullWidth>
            <MultiInputTimeRangeField
              placeholder='Предпочитаем время задачи(опц.)'
              slotProps={{
                textField: ({ position }) => ({
                  label: position === 'start' ? 'После' : 'До',
                }),
              }}
              value={preferredTaskTimeValue}
              onChange={handleChangePreferred}
            />
          </FormControl>
        </Grid>
      </Grid>
    </TabPanel>
  );
}