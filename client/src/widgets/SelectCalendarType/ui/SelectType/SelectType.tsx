import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getScheduleType } from 'entities/Shedule';
import { ScheduleTypes } from 'entities/Shedule';
import { scheduleActions } from 'entities/Shedule';

export const  SelectType: FC = () => {
    const dispatch = useAppDispatch();
    const scheduleType = useSelector(getScheduleType);
    const {setScheduleType} = scheduleActions;

    const handleChangeType = (type: ScheduleTypes) => {
      dispatch(setScheduleType(type));
    };

    return (
      <FormControl size='small' sx={{
        width: 150
      }}>
        <InputLabel id="calendar-select-label" sx={{
          color: 'white'
        }}>Вид календаря</InputLabel>
        <Select
          id="calendar-select"
          value={scheduleType}
          label="Вид календаря"
          labelId="calendar-select-label"
          IconComponent={CalendarMonthIcon}
          onChange={ e => handleChangeType(e.target.value as ScheduleTypes)}
          variant='outlined'
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
            },
            '& .MuiSvgIcon-root': {
                color: 'white'
            },
          }}
        >
          <MenuItem value={ScheduleTypes.DAY}>День</MenuItem>
          <MenuItem value={ScheduleTypes.WEEK}>Неделя</MenuItem>
          <MenuItem value={ScheduleTypes.MONTH}>Месяц</MenuItem>
          <MenuItem value={ScheduleTypes.UNPLANNED}>Нераспределенные</MenuItem>
        </Select>
      </FormControl>
    );
}