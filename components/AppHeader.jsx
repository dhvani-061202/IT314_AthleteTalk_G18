import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Logout, Notifications, Settings } from '@mui/icons-material';
import { useProSidebar } from 'react-pro-sidebar';

const AppHeader = () => {
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          color="secondary"
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Box component="img" sx={styles.appLogo} src="logo.svg" />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton title="Notifications" color="secondary">
          <Badge badgeContent={14} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton title="Settings" color="secondary">
          <Settings />
        </IconButton>
        <IconButton title="Sign Out" color="secondary">
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: 'neutral.main',
  },
  appLogo: {
    ml: 1,
    width: 40,
    cursor: 'pointer',
  },
};

export default AppHeader;
