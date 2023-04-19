import { Box, Typography } from '@mui/material';
import React from 'react';

const ChatBox = ({ selectedChat }) => {
  return (
    <>
      <Box>
        <Typography variant="h4">ChatBox</Typography>
        Showing chats for {selectedChat}
      </Box>
    </>
  );
};

export default ChatBox;
