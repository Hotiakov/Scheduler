import { Box } from '@mui/material';
import { FC } from 'react';
import { MonthSwitcher } from 'widgets/DateSwitchers';
import { MonthCalendar } from 'widgets/MonthCalendar';

export const MonthPage: FC= () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 2,
            }}
        >
            <MonthSwitcher/>
            <MonthCalendar/>
        </Box>
    );
}