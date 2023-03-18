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
const { server } = require('./../../../utils/server');

const PlanDetails = ({ plan }) => {
  const router = useRouter();
  const theme = useTheme();
  console.log(plan);

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <>
      <Button onClick={handleBack} variant="contained">
        Back
      </Button>
      <Box>
        <Typography variant="h3">{plan.name}</Typography>
        <Typography variant="h5">{plan.description}</Typography>
        <Typography variant="h5">
          <b>Created By:</b> {plan.creator.name}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1, display: 'inline' }}>
          Categories:{' '}
        </Typography>
        {plan.categories.map((category, idx) => {
          return (
            <Typography
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                color: 'white',
                width: 'fit-content',
                padding: 0.76,
                mr: 0.3,
                borderRadius: '20px',
                backgroundColor: theme.palette.primary.main,
              }}
              key={idx}
              variant="p"
            >
              {category.name}
            </Typography>
          );
        })}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No. </TableCell>
                <TableCell>Video Name</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { id } = context.query;
  if (!req.cookies.jwt) {
    console.log('Cookie not found🍪🍪');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const planResponse = await fetch(`${server}/api/plans/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });
    if (!planResponse.ok)
      throw new Error('Something went wrong!🥲', planResponse);
    const planData = await planResponse.json();
    return {
      props: {
        plan: planData.data.plan,
      },
    };
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

export default PlanDetails;
