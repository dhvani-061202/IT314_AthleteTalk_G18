import React, { useEffect } from 'react';
import { useContext } from 'react';
import MainLayout from '../../../layouts/mainLayout';
import AuthContext, { AuthContextProvider } from '../../../store/auth-context';
const { server } = require('./../../../utils/server');
import VideoCard from '../../../components/VideoCard';
import { Grid } from '@mui/material';

const BrowseVideos = (props) => {
  const authCtx = useContext(AuthContext);
  let videos = props.data.data.videos;

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

// BrowseVideos.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export async function getServerSideProps(context) {
  const { req, res } = context;

  const response = await fetch(`${server}/api/videos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.cookies.jwt}`,
    },
  });

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default BrowseVideos;
