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
  // console.log(videosSelected);
  const handleCreatePlans = async (event) => {
    event.preventDefault();

    if (
      !planName ||
      !planDes ||
      selectedCategories.length == 0 ||
      noOfDays == 0
    ) {
      alert('Please fill all the fields');
      return;
    }

    const filteredCateogries = categories.filter((category) =>
      selectedCategories.includes(category.name)
    );
    const selectedCategoriesID = filteredCateogries.map(
      (category) => category._id
    );
    // console.log(filteredCateogries);
    const plan = {
      name: planName,
      description: planDes,
      categories: selectedCategoriesID,
      noOfDays: noOfDays,
      videos: videosSelected,
    };

    const postResponse = await fetch(`/api/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(plan),
    });

    if (postResponse.ok) {
      alert('Pland created successfully');
    } else {
      alert('Error creating plan');
      console.log(postResponse);
    }
  };
};