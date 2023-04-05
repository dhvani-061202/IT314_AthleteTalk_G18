// Importing necessary modules
import React, { useEffect } from 'react';
const { server } = require('./../../../utils/server');
import VideoCard from '../../../components/VideoCard';
import { Grid } from '@mui/material';

// Functional component to browse videos
const BrowseVideos = ({ videos }) => {
  return (
      // Creating a grid layout to display the video cards
      <Grid container spacing={2}>
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

// Server-side function to get the videos from API
export async function getServerSideProps(context) {
  const { req, res } = context;
  
  // Checking if there is a cookie of jwt token
  if (!req.cookies.jwt)
    return { redirect: { destination: '/login', permanent: false } };
  
  try {
    // Fetching videos from API
    const response = await fetch(`${server}/api/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });

    // If response is ok, return the videos as props
    if (response.ok) {
      const data = await response.json();
      return { props: { videos: data.data.videos } };
    } 
    else {
      // If response is not ok, throw an error
      throw new Error('something went wrong!');
    }
  } catch (err) {
    // If there is any error, redirect the user to login page
    console.log(err);
    return { redirect: { destination: '/login', permanent: false } };
  }
}
  
export default BrowseVideos;