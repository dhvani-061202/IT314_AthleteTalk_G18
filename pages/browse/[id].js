import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
const { server } = require('./../../../utils/server');

const PlanDetails = ({ plan, planVideos, taken }) => {
  const router = useRouter();
  const theme = useTheme();
  const [planTaken, setPlanTaken] = useState(taken);

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const addPlanHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/api/user-plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          plan: plan._id,
        }),
      });
      if (response.ok) {
        setPlanTaken(true);
      } else {
        throw new Error('Something went wrong!: ', err);
      }
    } catch (err) {
      console.log(err);
      alert('err');
    }
  };
};
