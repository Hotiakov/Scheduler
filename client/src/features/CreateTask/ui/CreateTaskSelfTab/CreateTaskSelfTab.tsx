import { Box, Checkbox, duration, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";

import { createTaskActions } from "features/CreateTask";
import { getCreateTaskForm } from "features/CreateTask/model/selectors/getCreateTask";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { TabPanel } from "shared/ui/TabPanel/TabPanel";
import { Day } from "shared/types/repeatability";
import { getUserInfo } from "entities/User";
import { getTimeDiff } from "shared/lib/getTimeDiff/getTimeDiff";


interface CreateTaskSelTabfProps {
  value: number;
}

type RepeatTypes = "weekly" | "specific";

export const CreateTaskSelfTab: FC<CreateTaskSelTabfProps> = ({ value }) => {
  const dispatch = useAppDispatch();
  const { setRepeatability } = createTaskActions;
  const { repeatability, duration } = useSelector(getCreateTaskForm);
  const { dayInterval } = useSelector(getUserInfo);

  const handleChangeType = (type: RepeatTypes) => {
    dispatch(setRepeatability({
      ...repeatability,
      type: type,
      days: [],
    }));
  };

  const handleChangeSpecificDays = (dateObjects: DateObject[]) => {
    dispatch(setRepeatability({
      ...repeatability,
      type: 'specific',
      days: dateObjects?.map((dateObject) => dateObject.toDate()) ?? null,
    }));
  };

  const handleChangeWeekDays = (weekDay: Day, status: boolean) => {
    let days: Day[];
    if(status){
      days = [...(repeatability.days as Day[]), weekDay];
    } else {
      days = (repeatability.days as Day[]).filter((item: Day) => item !== weekDay);
    }
    dispatch(setRepeatability({
      ...repeatability,
      type: 'weekly',
      days: days,
    }));
  };

  const handleChangeTime = (time: Dayjs) => {
    dispatch(setRepeatability({
      ...repeatability,
      time: time ? time.toDate() : null,
    }));
  };

  return (
    <TabPanel label="task" index={0} value={value}>
      <Grid container sx={{
        gap: 2,
        width: '100%',
      }}>
        {(
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TimePicker
                value={repeatability?.time ? dayjs(repeatability.time) : null}
                onChange={handleChangeTime}
                label='Время начала'
                sx={{                  
                  width: '100%'
                }}
                minTime={dayjs(dayInterval.from)}
                maxTime={dayjs(getTimeDiff(dayInterval.to, duration))}
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="repeat-label">Тип повторения</InputLabel>
            <Select 
              label='Тип повторения'
              labelId="repeat-label"
              value={repeatability?.type} 
              onChange={(e) => handleChangeType(e.target.value as RepeatTypes)}
              sx={{                  
                width: '100%'
              }}
            >
              <MenuItem value="specific">Отдельные даты</MenuItem>
              <MenuItem value="weekly">Еженедельное повторение</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {repeatability?.type === "weekly" && (
          <Grid item xs={12}>
              <FormLabel component="legend">Выберите дни недели</FormLabel>
              <FormGroup row>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                  <FormControlLabel 
                    key={day} 
                    control={
                      <Checkbox 
                        checked={(repeatability?.days).includes(day as Day)} 
                        onChange={(e) => handleChangeWeekDays(day as Day, e.target.checked)} 
                      />
                    } 
                    label={day.slice(0, 3)} 
                  />
                ))}
              </FormGroup>
          </Grid>
        )}
        {repeatability?.type === "specific" && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <DatePicker
                value={repeatability?.days}
                multiple
                editable={false}
                format="DD-MM-YYYY"
                onChange={handleChangeSpecificDays}
                placeholder='Выберите даты'
                render={<TextField fullWidth 
                  label='Даты'
                  required
                />}
                showOtherDays
                minDate={Date.now()}
                required
              />
            </FormControl>
          </Grid>
        )}
        </Grid>
    </TabPanel>
  );
};
