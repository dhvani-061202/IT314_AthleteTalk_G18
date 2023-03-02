import {
  AnalyticsOutlined,
  DashboardOutlined,
  SourceOutlined,
  StyleOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

const SideNav = (props) => {
  const theme = useTheme();
  const router = useRouter();
  console.log(router.pathname);

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
            {props.user ? props.user.name.toUpperCase() : ' '}
          </Typography>
        )}
        {!collapsed && (
          <Typography variant="overline">React with Someone</Typography>
        )}
      </Box>
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active
                ? theme.palette.neutral.medium
                : undefined,
            };
          },
        }}
      >
        <MenuItem
          active={router.pathname === '/dashboard'}
          component={<Link href="/dashboard" />}
          icon={<DashboardOutlined />}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
        {props.user && props.user.role !== 'user' && (
          <MenuItem
            active={router.pathname === '/upload-video'}
            component={<Link href="/upload-video" />}
            icon={<SourceOutlined />}
          >
            <Typography variant="body2">Upload Video</Typography>
          </MenuItem>
        )}
        <MenuItem
          active={router.pathname === '/plans'}
          component={<Link href="/plans" />}
          icon={<AnalyticsOutlined />}
        >
          <Typography variant="body2">Plans</Typography>
        </MenuItem>
        <MenuItem
          active={router.pathname === '/community-chat'}
          component={<Link href="/community-chat" />}
          icon={<StyleOutlined />}
        >
          <Typography variant="body2">Community Chat</Typography>
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
