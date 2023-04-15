import { Box, Typography } from '@mui/material';
import React from 'react';

const ChatBox = ({ chatBox }) => {
  return (
    <>
      <Box>
        <Typography variant="h4">ChatBox</Typography>
        Showing chats for {chatBox}
      </Box>
    </>
  );
};

export default ChatBox;
