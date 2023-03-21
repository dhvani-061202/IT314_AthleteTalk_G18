import React, { useEffect } from 'react';
const { server } = require('./../../../utils/server');
import VideoCard from '../../../components/VideoCard';
import { Grid } from '@mui/material';

const BrowseVideos = ({ videos }) => {
  return (
    <Grid container spacing={2} style={{ width: '80%', ml: '10%' }}>
      {videos &&
        videos.length !== 0 &&
        videos.map((video, idx) => (
          <Grid key={idx} item>
            <VideoCard details={video} />
          </Grid>
        ))}
    </Grid>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;

  //Checking if there is a cookie of jwt token
  if (!req.cookies.jwt)
    return { redirect: { destination: '/login', permanent: false } };

  try {
    const response = await fetch(`${server}/api/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return { props: { videos: data.data.videos } };
    }
  } catch (err) {
    console.log(err);
    return { redirect: { destination: '/login', permanent: false } };
  }
  return { redirect: { destination: '/login', permanent: false } };
}

export default BrowseVideos;
