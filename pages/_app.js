import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './../config/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ProSidebarProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </ProSidebarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
