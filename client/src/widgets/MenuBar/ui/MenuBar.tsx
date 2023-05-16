import { AppBar, Box } from "@mui/material";
import { FC } from "react";
import Toolbar from "@mui/material/Toolbar";
import { CreateTaskBtn } from "widgets/CreateTaskBtn/CreateTaskBtn";
import { LogoutButton } from "widgets/LogoutButton";
import { SelectType } from "widgets/SelectCalendarType";
export const MenuBar: FC = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <CreateTaskBtn />
          <SelectType />
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
