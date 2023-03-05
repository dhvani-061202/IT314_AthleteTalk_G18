import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import React, { useEffect, useContext } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import {
  CssBaseline,
  getFormLabelUtilityClasses,
  ThemeProvider,
} from '@mui/material';
import theme from './../config/theme';
import AuthContext, { AuthContextProvider } from './../store/auth-context';
import MainLayout from '../layouts/mainLayout';

function MyApp({ Component, pageProps }) {
  // const getLayout = Component.getLayout || ((page) => page);
  // const component = getLayout(<Component {...pageProps} />);

  if (Component.getLayout) {
    return (
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <ProSidebarProvider>
            <CssBaseline />
            {Component.getLayout(<Component {...pageProps} />)}
          </ProSidebarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    );
  }

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          <MainLayout>{<Component {...pageProps} />}</MainLayout>
        </ProSidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
