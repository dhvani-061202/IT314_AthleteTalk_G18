import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';
import AuthContext from './../../store/auth-context';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <Typography varient="h6">
        DashBoard, You are{' '}
        {isLoggedIn ? `${authCtx.user.name}🙂` : 'not logged in🤔'}
      </Typography>
    </>
  );
};

/** @type {import('@mui/material').SxProps} */
const styles = {};

export default Dashboard;
