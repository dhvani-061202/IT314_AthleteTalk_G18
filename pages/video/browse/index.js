import React, { useEffect } from 'react';
import { useContext } from 'react';
import MainLayout from '../../../layouts/mainLayout';
import AuthContext, { AuthContextProvider } from '../../../store/auth-context';
const { server } = require('./../../../utils/server');
import VideoCard from '../../../components/VideoCard';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';

const BrowseVideos = (props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [videos, setVideos] = React.useState([]);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.push('/login');
      return;
    }

    fetch(`/api/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          return new Error('Something went wrong!🥲');
        }
      })
      .then((data) => {
        console.log(data);
        setVideos(data.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx.isLoggedIn]);

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
/*
export async function getServerSideProps(context) {
  const { req, res } = context;

  try {
    const response = await fetch(`http://localhost:3000/api/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { props: { data } };
    }

    console.log(response);
  } catch (err) {
    console.log(err);
    return { props: {} };
  }

  return {
    props: {
      data,
    },
  };
}

*/
export default BrowseVideos;
