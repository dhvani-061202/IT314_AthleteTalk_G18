import React, { useContext, useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import '@fontsource/roboto/300.css';

const Dashboard = ({ user }) => {
  return (
    <>
      <Typography varient="h6">DashBoard, You are {user.name}</Typography>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;

  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.jwt}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        props: {
          user: data.user,
        },
      };
    } else {
      throw new Error('Not authenticated!');
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Dashboard;
