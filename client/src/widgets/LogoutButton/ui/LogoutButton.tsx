import { FC } from 'react';
import { useSelector } from "react-redux";
import { getUserUsername } from "entities/User";
import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { logout } from 'features/Auth/Logout';

export const  LogoutButton: FC = () => {
  const username = useSelector(getUserUsername);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  }

  if(!username) return null;

  return (
      <Box sx={{
        flexGrow: 1,
        textAlign: 'right'
      }}>
        <IconButton
          size="large"
          aria-label="пользователь"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {username} <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Выход</MenuItem>
        </Menu>
      </Box>
    )
}