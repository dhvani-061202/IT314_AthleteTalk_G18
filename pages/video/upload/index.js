// Importing necessary modules
import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FormDialog from '../../../components/FormDialog';
import MultipleSelectChip from '../../../components/MultiSelect';
import server from '../../../server';


function UploadVideo({ categories }) {
  // Set up state variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [newCategoryButtonClicked, setNewCategoryButtonClicked] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // variable for storing the category IDs associated with the video.
  let categoryIds = [];
  const extractedCategories = categories.map((category) => category.name);
  const [fileName, setFileName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);

  // Function to handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally.
    setSubmitLoader(true);

    // Validate the user input, and display an alert if any fields are missing.
    if (!title) 
      return alert('Please provide a title for the video!');
    if (!description)
      return alert('Please provide a description for the video!');
    if (!selectedCategories.length)
      return alert('Please select at least one category for the video!');
    if (!file) 
      return alert('Please select a file to upload!');

    // If the user input is valid, extract the category IDs
    categoryIds = [];
    categories.find((category) => {
      if (selectedCategories.includes(category.name)) {
        categoryIds.push(category._id);
      }
    });

    // New FormData object to append video title, description, categories, and file data to it.
    let formData = new FormData();
    formData.append('file', file.data);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categories', categoryIds);
    console.log('Sending the video upload req');

    // Send a POST request to the server to upload the video data.
    fetch(`/api/videos/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((response) => {
        setSubmitLoader(false); // Once the request is complete, set "submitLoader" back to false.
        if (response.ok) {      // If the response is OK, return the response data as JSON.
          return response.json();
        } 
        else {                  // If the response is not OK, log an error message and throw an error.
          console.log(response);
          throw new Error('Something went wrong!🥲');
        }
      })
      .then((data) => {
        // display an alert indicating that the video was successfully uploaded.
        console.log(data);
        alert('Video Uploaded Successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function to handle new file is selected for upload.
  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFileName(e.target.value);
    setFile(file);
  };

  return (
      <>
      
        <Typography sx={{ p: 2, fontSize: '2rem' }}>Upload Video</Typography>
        
        <Box                              // form container
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>                         
            <TextField                    // video title 
              id="outlined-basic"
              label="Title"
              varient="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField                    // video description
              id="outlined-basic"
              label="Description"
              varient="outlined"
              multiline
              maxRows={4}
              sx={{ width: '150%' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <MultipleSelectChip          // component for selecting multiple categories
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
          </div>
          <div>
            <Button variant="outlined" component="label" color="primary">  
              Pick a File
              <input
                type="file"
                onChange={handleFileChange}
                hidden
                accept="video/*"
              />
            </Button>
            {fileName.split('\\').pop()}
          </div>
          <div>
            {submitLoader && (
              <LoadingButton loading variant="outlined" disabled>
                Uploading
              </LoadingButton>
            )}
            {!submitLoader && (
              <LoadingButton variant="contained" onClick={handleSubmit}>
                Submit
              </LoadingButton>
            )}
          </div>
        </Box>
      </>
  );
}
    
export default UploadVideo;

// function that fetches data before rendering the page
export const getServerSideProps = async (context) => {
      const { req, res } = context;

      // If user is not logged in, redirect to login page
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
        // Fetch categories data from the backend
        const categoriesResponse = await fetch(`${server}/api/category`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.cookies.jwt}`,
          },
        });
    
        let categories;
        if (categoriesResponse.ok) {                      // If categories data is retrieved successfully
          const data = await categoriesResponse.json();
          if (!data.data.categories) throw new Error('No categories found');
          categories = data.data.categories;
        } 
        else {                                            // If the response is not okay, throw an error
          throw new Error('Something went wrong!🥲');
        }
    
        // Return the retrieved categories as props
        return {
          props: {
            categories,
          },
        };
      } catch (err) {
        // If an error redirect to login page
        console.log(err);
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
};