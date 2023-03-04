import React from 'react';
import AppHeader from '../components/AppHeader';

const Home = () => {
  return <div>Home</div>;
};

Home.getLayout = (page) => (
  <>
    <AppHeader />
    {page}
  </>
);

export default Home;
