import {
  AnalyticsOutlined,
  DashboardOutlined,
  SourceOutlined,
  StyleOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

const SideNav = () => {
  const theme = useTheme();
  const { collapsed } = useProSidebar();
  return (
    <Sidebar
      style={{
        height: '100%',
        top: 'auto',
      }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.light}
    >
      <Box sx={styles.avatorContainer}>
        <Avatar sx={styles.avatar} alt="Channel Name" src="user.svg" />
        {!collapsed && (
          <Typography variant="body2" sx={styles.yourChannel}>
            Channel Name
          </Typography>
        )}
        {!collapsed && (
          <Typography variant="overline">React with Someone</Typography>
        )}
      </Box>
      <Menu>
        <MenuItem active icon={<DashboardOutlined />}>
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        <MenuItem icon={<SourceOutlined />}>
          <Typography variant="body2">Content</Typography>
        </MenuItem>
        <MenuItem icon={<AnalyticsOutlined />}>
          <Typography variant="body2">Analytics</Typography>
        </MenuItem>
        <MenuItem icon={<StyleOutlined />}>
          <Typography variant="body2">Customization</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  avatorContainer: {
    display: 'flex',
    alignItems: 'center',
    my: 5,
    flexDirection: 'column',
  },
  avatar: {
    width: '40%',
    height: 'auto',
  },
  yourChannel: {
    mt: 1,
  },
};

export default SideNav;
