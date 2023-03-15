import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import FormDialog from '../../../components/FormDialog';
import MultipleSelectChip from '../../../components/MultiSelect';
import server from '../../../server';
import MultiSelectTable from '../../../components/MultiSelectTable';

const CreatePlans = ({ categories, videos }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const extractedCategories = categories.map((category) => category.name);
  const [newCategoryButtonClicked, setNewCategoryButtonClicked] =
    useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);
  const [noOfDays, setNoOfDays] = useState(1);
  const [planName, setPlanName] = useState('');
  const [planDes, setPlanDes] = useState('');
  const [videosSelected, setVideosSelected] = useState([[]]);

  const handleCreatePlans = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setVideosSelected((prev) => {
      const newVideosSelected = prev;
      let diff = noOfDays - prev.length;
      while (diff !== 0) {
        if (diff > 0) {
          newVideosSelected.push([]);
          diff--;
        } else {
          newVideosSelected.pop();
          diff++;
        }
      }
      return newVideosSelected;
    });
  }, [noOfDays]);

  const handleNext = () => {
    if (currentPage == 0 || (currentPage == 1 && currentDay == noOfDays)) {
      setCurrentPage((prev) => prev + 1);
    } else if (currentPage == 1) {
      setCurrentDay((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage == 2 || (currentPage == 1 && currentDay == 1)) {
      setCurrentPage((prev) => prev - 1);
    } else if (currentPage == 1) {
      setCurrentDay((prev) => prev - 1);
    }
  };

  const page0 = (
    <>
      <TextField
        margin="normal"
        required
        id="name"
        label="Plan Name"
        name="name"
        autoComplete="name"
        autoFocus
        fullWidth
        onChange={(e) => setPlanName(e.target.value)}
        value={planName}
      />

      <TextField
        margin="normal"
        required
        id="description"
        label="Plan Description"
        name="description"
        autoComplete="description"
        fullWidth
        onChange={(e) => setPlanDes(e.target.value)}
        value={planDes}
      />

      <TextField
        margin="normal"
        required
        type="number"
        id="noOfDays"
        label="No of Days"
        name="noOfDays"
        autoComplete="No of Days"
        fullWidth
        inputProps={{ min: '0', max: '60' }}
        onChange={(e) => {
          setNoOfDays(e.target.value);
        }}
        value={noOfDays}
      />
      <br></br>
      <br></br>
      <MultipleSelectChip
        label="Categories"
        names={extractedCategories}
        personName={selectedCategories}
        setPersonName={setSelectedCategories}
      />
      <Typography variant="h6">Didn&apos;t find your category? </Typography>
      <FormDialog
        changeButtonClickState={setNewCategoryButtonClicked}
        label="Add Category"
        textPlaceHolder="Category Name"
      />
    </>
  );

  const page1 = (
    <>
      <Typography variant="h4">Day {currentDay}</Typography>
      <MultiSelectTable
        rows={videos}
        selectedVideos={videosSelected}
        setVideosSelected={setVideosSelected}
        day={currentDay - 1}
      />
    </>
  );
  const page2 = <>Summary Page</>;

  const pages = [page0, page1, page2];

  return (
    <>
      <Typography variant="h3">Create Plans</Typography>
      <Box
        alignContent={'center'}
        component="form"
        noValidate
        onSubmit={handleCreatePlans}
        sx={{ mt: 1, width: '80%', ml: '10%' }}
      >
        {pages[currentPage]}
        <br></br>
        <Button variant="standard" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {currentPage != pages.length - 1 && 'Next'}
          {currentPage == pages.length - 1 && 'Submit'}
        </Button>
      </Box>
    </>
  );
};

export default CreatePlans;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
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
    const categoriesResponse = await fetch(`${server}/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });

    let categories;
    if (categoriesResponse.ok) {
      const data = await categoriesResponse.json();
      if (!data.data.categories) throw new Error('No categories found');
      categories = data.data.categories;
    } else {
      console.log(categoriesResponse);
      throw new Error('Something went wrong!🥲');
    }

    const videosResponse = await fetch(`${server}/api/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });

    let videos;
    if (videosResponse.ok) {
      const data = await videosResponse.json();
      if (!data.data.videos) throw new Error('No videos found');
      videos = data.data.videos;
    } else {
      console.log(videosResponse);
      throw new Error('Something went wrong!🥲');
    }

    return {
      props: {
        categories,
        videos,
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
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
