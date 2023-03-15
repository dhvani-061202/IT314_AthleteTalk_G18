import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import AuthContext from './../../store/auth-context';
import AppHeader from './../../components/AppHeader';
import SideNav from './../../components/SideNav';
import MainLayout from '../../layouts/mainLayout';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('token')) {
      router.push('/login');
    }

    return () => {
      // cleanup
    };
  }, []);

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
