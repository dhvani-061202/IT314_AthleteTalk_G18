import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
const { server } = require('./../../../utils/server');

const BrowsePlans = ({ plans }) => {
  return (
    <>
      <div>BrowsePlans</div>
      <Grid container spacing={2}>
        {plans.map((plan, idx) => {
          return (
            <Grid xs={4} key={idx} item>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography color="text.primary" variant="h5" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography
                    color="text.primary"
                    variant="p"
                    sx={{ display: 'block' }}
                  >
                    {plan.description + plan.description}
                  </Typography>
                  <Typography color="text.primary" variant="body1">
                    <b>Created By</b>: {plan.creator.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/plans/browse/${plan._id}`} size="small">
                    View Details
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
