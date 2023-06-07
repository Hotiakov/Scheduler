import { Box, Button } from "@mui/material";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { getScheduleInterval, scheduleActions } from "entities/Shedule";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDayStart, setDayEnd, setDayMonday, setDaySunday } from "shared/lib/setDateTime/setDateTime";
import { Day } from "shared/ui/WeekPicker/WeekPicker";

export const WeekSwitcher: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { setScheduleDateInterval } = scheduleActions;
  const scheduleInterval = useSelector(getScheduleInterval);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScheduleDateInterval({
      from: setDayMonday(new Date(date)),
      to: setDaySunday(new Date(date)),
    }));
  }, [date]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: '100%',
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 1000,

      }}>
      <Button onClick={
        () => setDate(new Date())
      } variant='text'>Эта неделя</Button>
      <Button onClick={
        () => {
          const today = new Date();
          const nextWeek = new Date(today);
          nextWeek.setDate(nextWeek.getDate() + 7);
          setDate(nextWeek);
        }
      } variant='text'>Следующая неделя</Button>
      <DatePicker
        value={dayjs(date)}
        onChange={(date) => setDate(date.toDate())}
        slots={{ day: Day }}
        showDaysOutsideCurrentMonth 
        slotProps={{
          day: {
            selectedDay: dayjs(date),
          } as any,
        }}
      />
    </Box>
  );
};
