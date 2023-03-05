import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FormDialog from '../../../components/FormDialog';
import MultipleSelectChip from '../../../components/MultiSelect';
import server from '../../../server';
import AuthContext from '../../../store/auth-context';

function UploadVideo() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [newCategoryButtonClicked, setNewCategoryButtonClicked] =
    useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  let categoryIds = [];
  const extractedCategories = useRef([]);

  const [fileName, setFileName] = useState('');

  const [submitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log('Sending fetch req');
    if (
      !localStorage.getItem('token') &&
      (!authCtx.isLoggedIn || authCtx.user.role === 'user')
    ) {
      router.push('/dashboard');
      return () => {
        console.log('aborting fetch');
        abortController.abort();
      };
    }

    fetch(`/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error('Something went wrong!🥲');
        }
      })
      .then((data) => {
        setCategories(data.data.categories);
        extractedCategories.current = [];
        data.data.categories.map((category) => {
          extractedCategories.current.push(category.name);
        });
        console.log('Categories Loaded');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCategoryButtonClicked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);

    if (!title) return alert('Please provide a title for the video!');
    if (!description)
      return alert('Please provide a description for the video!');
    if (!selectedCategories.length)
      return alert('Please select at least one category for the video!');
    if (!file) return alert('Please select a file to upload!');

    categoryIds = [];
    categories.find((category) => {
      if (selectedCategories.includes(category.name)) {
        categoryIds.push(category._id);
      }
    });

    let formData = new FormData();
    formData.append('file', file.data);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categories', categoryIds);
    console.log('Sending the video upload req');
    fetch(`/api/videos/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((response) => {
        setSubmitLoader(false);
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error('Something went wrong!🥲');
        }
      })
      .then((data) => {
        console.log(data);
        alert('Video Uploaded Successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Title"
            varient="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
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
          <MultipleSelectChip
            label="Categories"
            names={extractedCategories.current}
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
