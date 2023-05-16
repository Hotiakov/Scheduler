import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { WeekSwitcher } from "widgets/DateSwitchers";
import { TimeSlots } from "widgets/TimeSchedule";
import { WeekCalendar } from "widgets/WeekCalendar";
import { WeekDays } from "widgets/WeekDays";

export const WeekPage: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}>
      <WeekSwitcher />
      <WeekDays />
      <Grid container>
        <Grid item xs={1} container direction="column">
          <TimeSlots />
        </Grid>
        <WeekCalendar />
      </Grid>
    </Box>
  );
};
