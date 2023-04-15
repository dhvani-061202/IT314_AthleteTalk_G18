import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import NewGroupChatDialog from './NewGroupChatDialog';

const MyChats = ({ chats, setActiveChatBox, setAllChats }) => {
  const handleChatSelect = (e) => {
    setActiveChatBox(e.target.value);
  };

  return (
    <Paper elevation={1} sx={{ height: '100%' }}>
      <Box
        p={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: 'fit-content',
            float: 'left',
          }}
        >
          My Chats
        </Typography>
        <NewGroupChatDialog setAllChats={setAllChats} />
      </Box>
      <hr style={{ width: '80%' }} />
      {chats.map((chat) => {
        return (
          <Box key={chat._id} paddingLeft={2} paddingRight={2} paddingTop={1}>
            <Button
              variant="standard"
              fullWidth
              sx={{ justifyContent: 'left', backgroundColor: '#eee' }}
              value={chat.chatName}
              onClick={handleChatSelect}
            >
              {chat.chatName}
            </Button>
          </Box>
        );
      })}
    </Paper>
  );
};

export default MyChats;
