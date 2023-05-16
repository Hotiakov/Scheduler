import { Tabs, Tab, Box, AppBar } from '@mui/material';
import { LoginForm } from 'features/Auth/AuthByUsername';
import { SignUpForm } from 'features/Auth/SignUpByUsername';
import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classnames/classnames';
import { a11yProps } from 'shared/lib/tabProps/tabProps';
import { TabPanel } from 'shared/ui/TabPanel/TabPanel';
import cls from './AuthTabs.module.scss';


interface AuthTabsProps {
   className?: string;
}

export const  AuthTabs: FC<AuthTabsProps> = ({className}) => {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ bgcolor: 'background.paper', width: '100%', margin: '0 auto' }}>
        <AppBar position="static">
          <Tabs 
            onChange={handleChange} 
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label='Вход' {...a11yProps(0, 'auth')}/>
            <Tab label='Регистрация' {...a11yProps(1, 'auth')}/>
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel index={0} value={value} label='auth'>
        <LoginForm/>
      </TabPanel>
      <TabPanel index={1} value={value} label='auth'>
        <SignUpForm/>
      </TabPanel>
    </>
  );
}