import {
  Box,
  Button,
  FilledInput,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import server from '../../server';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const response = await fetch(`/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data.user);
    } else {
      alert('Something went wrong', response);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const response = await fetch(`/api/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        imageUrl: document.getElementById('imageUrl').value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data.user);
      authContext.updateUser(data.user);
    } else {
      alert('Something went wrong', response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!profile.name) return <div>Loading...</div>;

  return (
    <>
      <Typography variant="h4">Your Profile</Typography>
      <br></br>
      <Box width="60%" ml="20%">
        <FormControl fullWidth>
          <TextField
            id="name"
            variant="outlined"
            label="Name"
            defaultValue={profile.name}
          ></TextField>
          <br></br>
          <TextField
            id="imageUrl"
            variant="outlined"
            label="Image Url"
            defaultValue={
              profile.imageUrl
                ? profile.imageUrl
                : `https://api.dicebear.com/6.x/micah/svg?seed=${profile?.name}+`
            }
          ></TextField>
          <br></br>
          <TextField
            id="email"
            variant="outlined"
            label="Email"
            defaultValue={profile.email}
          ></TextField>

          <br></br>
          <TextField
            disabled
            id="outlined-required"
            label="Role"
            defaultValue={profile.role === 'user' ? 'Athlete' : profile.role}
          />
        </FormControl>
        <br></br>
        <br></br>
        <Button
          variant="outlined"
          onClick={() => {
            router.push('/profile/category');
          }}
        >
          Update Categories
        </Button>
        {loading && (
          <Button disabled variant="contained" onClick={handleUpdate}>
            Updating...
          </Button>
        )}
        {!loading && (
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        )}
      </Box>
    </>
  );
};

export default Profile;
