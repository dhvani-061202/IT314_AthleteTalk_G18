import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import AuthContext from './../../store/auth-context';
import AppHeader from './../../components/AppHeader';
import SideNav from './../../components/SideNav';
import MainLayout from '../../layouts/mainLayout';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  if (!isLoggedIn) {
    return (
      <Typography
        sx={{
          width: '30%',
          ml: '35%',
          fontSize: '2.5rem',
          textAlign: 'center',
          fontWeight: 'bold',
          mt: '10%',
        }}
        varient="h1"
      >
        You ought to be logged in to see this page.
      </Typography>
    );
  }

  return (
    <>
      <Typography varient="h6">
        DashBoard, You are{' '}
        {isLoggedIn ? `${authCtx.user.name}🙂` : 'not logged in🤔'}
      </Typography>
    </>
  );
};

// Dashboard.getLayout = (page) => <MainLayout>{page}</MainLayout>;
// Dashboard.getLayout = (page) => <>{page}</>;

export default Dashboard;
