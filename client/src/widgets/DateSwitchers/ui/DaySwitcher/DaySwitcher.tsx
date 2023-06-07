import { Box, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { scheduleActions } from "entities/Shedule";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDayStart, setDayEnd } from "shared/lib/setDateTime/setDateTime";

export const DaySwitcher: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { setScheduleDateInterval } = scheduleActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScheduleDateInterval({
      from: setDayStart(new Date(date)),
      to: setDayEnd(new Date(date)),
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
      } variant='text'>Сегодня</Button>
      <Button onClick={
        () => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          setDate(tomorrow);
        }
      } variant='text'>Завтра</Button>
      <DatePicker
        value={dayjs(date)}
        onChange={(e: Dayjs) => setDate(e.toDate())}
      />
    </Box>
  );
};
