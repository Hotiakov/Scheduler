import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { DaySwitcher } from "widgets/DateSwitchers";
import { DayCalendar } from "widgets/DayCalendar";
import { TimeSlots } from "widgets/TimeSchedule";

export const DayPage: FC = () => {
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}>
      <DaySwitcher />
      <Grid container>
        <Grid item xs={2} container direction='column'>
          <TimeSlots />
        </Grid>
        <DayCalendar />
      </Grid>
    </Box>
  );
};
