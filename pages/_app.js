import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import {
  CssBaseline,
  getFormLabelUtilityClasses,
  ThemeProvider,
} from '@mui/material';
import theme from './../config/theme';
import { AuthContextProvider } from './../store/auth-context';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const component = getLayout(<Component {...pageProps} />);

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline />
          {component}
        </ProSidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
