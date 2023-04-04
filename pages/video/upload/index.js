import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FormDialog from '../../../components/FormDialog';
import MultipleSelectChip from '../../../components/MultiSelect';
import server from '../../../server';


function UploadVideo({ categories }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [newCategoryButtonClicked, setNewCategoryButtonClicked] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  let categoryIds = [];

  const extractedCategories = categories.map((category) => category.name);
  const [fileName, setFileName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);


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
          // console.log(categoriesResponse);
          throw new Error('Something went wrong!🥲');
        }
    
        return {
          props: {
            categories,
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