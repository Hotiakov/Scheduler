import { FC } from 'react';
import Tabs from '@mui/material/Tabs';
import { Box, Tab } from '@mui/material';
import { a11yProps } from 'shared/lib/tabProps/tabProps';


interface CreateTaskTabsProps {
  value: number;
  setValue: (value: number) => void;
}

export const  CreateTaskTabs: FC<CreateTaskTabsProps> = ({value, setValue}) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Выбор даты' {...a11yProps(0, 'task')}/>
          <Tab label='Автораспределение' {...a11yProps(1, 'task')}/>
        </Tabs>
      </Box>
    );
}