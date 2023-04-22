import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Avatar, Box, Icon, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import SimpleSnackbar from './SimpleSnackbar';
import { RemoveCircle } from '@mui/icons-material';
import AuthContext from '../store/auth-context';

export default function UpdateGroupChatModel({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
}) {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = React.useState(
    selectedChat.chatName
  );
  const [search, setSearch] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [renameLoading, setRenameLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const ctx = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Icon
        component={RemoveRedEyeIcon}
        sx={{
          bgcolor: '#ddd',
          borderRadius: '50%',
          p: 0.5,
          width: '30px',
          height: '30px',
          cursor: 'pointer',
        }}
        onClick={handleClickOpen}
      >
        Open alert dialog
      </Icon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            fontSize: '35px',
            display: 'flex',
            justifyContent: 'center',
          }}
          id="alert-dialog-title"
        >
          {selectedChat.chatName.toUpperCase()}
        </DialogTitle>
        <DialogContent>
          <Box>
            {selectedChat.users.map((user) => (
              <Box
                key={user._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f0f0f0',
                  padding: '5px',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
              >
                <Avatar
                  sx={{ width: '30px', height: '30px' }}
                  src={`https://api.dicebear.com/6.x/micah/svg?seed=${user?.name}+`}
                />
                <Typography variant="body1">{user.name}</Typography>
                {!selectedChat.users.some((u) => u.name === user.name) && (
                  <Button
                    sx={{ width: '90px' }}
                    variant="outlined"
                    onClick={(e) => {
                      setSelectedUsers([
                        ...selectedChat.users,
                        { name: user.name, id: user._id },
                      ]);
                    }}
                  >
                    Add
                  </Button>
                )}
                {selectedChat.users.some((u) => u.name === user.name) &&
                  selectedChat.groupAdmin._id === ctx.user._id && (
                    <Icon
                      component={RemoveCircle}
                      onClick={async (e) => {
                        await fetch('/api/chat/group/user', {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem(
                              'token'
                            )}`,
                          },
                          body: JSON.stringify({
                            chatId: selectedChat._id,
                            userId: user._id,
                          }),
                        });
                        setSelectedChat((prev) => {
                          return {
                            ...prev,
                            users: selectedChat.users.filter(
                              (u) => user.name !== u.name
                            ),
                          };
                        });
                        setFetchAgain((prev) => !prev);
                      }}
                    ></Icon>
                  )}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <SimpleSnackbar
        open={openSnackbar}
        handleClose={onClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
}
