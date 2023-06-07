import { Box, Button, TextField } from "@mui/material";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { scheduleActions } from "entities/Shedule";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  setFirstMonthDay, setLastMonthDay } from "shared/lib/setDateTime/setDateTime";

export const MonthSwitcher: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { setScheduleDateInterval } = scheduleActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScheduleDateInterval({
      from: setFirstMonthDay(new Date(date)),
      to: setLastMonthDay(new Date(date)),
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

      }}
    >
      <Button onClick={
        () => setDate(new Date())
      } variant='text'>Текущий месяц</Button>
      <DatePicker
        views={['year', 'month']}
        value={dayjs(date)}
        onChange={(date) => setDate(date.toDate())}
        openTo='month'
      />
    </Box>
  );
};
