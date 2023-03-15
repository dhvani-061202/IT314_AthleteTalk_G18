import React, { useEffect } from 'react';
import { useContext } from 'react';
import MainLayout from '../../../layouts/mainLayout';
import AuthContext, { AuthContextProvider } from '../../../store/auth-context';
const { server } = require('./../../../utils/server');
import VideoCard from '../../../components/VideoCard';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';

const BrowseVideos = ({ videos }) => {
  // const authCtx = useContext(AuthContext);
  // const [videos, setVideos] = React.useState([]);
  /*
  useEffect(() => {
    if (!localStorage.getItem('token') && !authCtx.isLoggedIn) {
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

  */

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
