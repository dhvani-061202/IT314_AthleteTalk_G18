import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import theme from '../config/theme';
import SideNav from '../components/SideNav';
import AppHeader from '../components/AppHeader';
import { ProSidebarProvider } from 'react-pro-sidebar';

function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
      {' '}
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <AppHeader />
          <Box sx={styles.container}>
            <SideNav />
            <Box component="main" sx={styles.mainSection}>
              <Component {...pageProps} />
            </Box>
          </Box>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}

/** @type {import('@mui/material').SxProps} */
const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc( 100% - 64px )',
  },
  mainSection: {
    p: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
};

export default MyApp;
