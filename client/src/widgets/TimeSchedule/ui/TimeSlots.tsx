import { Grid, Typography } from "@mui/material";
import { getUserDayInterval } from "entities/User";
import { useSelector } from "react-redux";

const timeSlotStyle = {
  textAlign: 'right',
  paddingRight: '16px',
  height: '80px',
  borderTop: '1px solid',
};

const generateTimeSlots = (start: Date, end: Date) => {
  const timeSlots =[];
  for (let time = new Date(start); time < end; time.setHours(time.getHours() + 1)) {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeSlots.push(formattedTime);
  }
  return timeSlots
}


export const TimeSlots = () => {
  const day = new Date()
  const fromDate = new Date(day.getFullYear(), day.getMonth(), day.getDay());
  const toDate = new Date(day.getFullYear(), day.getMonth(), day.getDay() + 1);
  const timeSlots = generateTimeSlots(fromDate, toDate);

  return (
    <>{
      timeSlots.map(item => (
        <Grid item key={item} sx={timeSlotStyle}>
          <Typography variant="body1">{item}</Typography>
        </Grid>
      ))
    }
      <Grid item sx={timeSlotStyle}>
        <Typography variant="body1">00:00</Typography>
      </Grid>
    </>
  );
};