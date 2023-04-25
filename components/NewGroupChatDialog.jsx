import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
  Avatar,
  Stack,
  Icon,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { server } from '../utils/server';
import Image from 'next/image';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import SimpleSnackbar from '../components/SimpleSnackbar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PersonAdd } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewGroupChatDialog({ setAllChats }) {
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [queriedUsers, setQueriedUsers] = React.useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatName = useRef();

  const handleClickOpen = () => {
    setQueriedUsers([]);
    setSelectedUsers([]);
    setLoading(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create group chat
    if (selectedUsers.length < 2) {
      // alert('Please select at least two user');
      setSnackbarMessage('Please select at least two user');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    const selectedUsersId = selectedUsers.map((user) => user.id);

    const body = {
      name: chatName.current.value,
      users: selectedUsersId,
    };

    const createGroupReq = await fetch(`/api/chat/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    });

    if (createGroupReq.ok) {
      const newChat = await createGroupReq.json();

      setAllChats((prevChats) => {
        return [newChat.data.chat, ...prevChats];
      });
      setSnackbarMessage('Group chat created');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } else {
      console.log(createGroupReq);
      setSnackbarMessage('Something went wrong');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }

    handleClose();
  };
}