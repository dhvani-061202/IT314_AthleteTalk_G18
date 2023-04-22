import { Box, Typography } from '@mui/material';
import React from 'react';
import SingleChat from './SingleChat';

const ChatBox = ({
  selectedChat,
  fetchAgain,
  setFetchAgain,
  setSelectedChat,
}) => {
  return (
    <Box
      height={'100%'}
      display="flex"
      alignItems={'center'}
      flexDirection={'column'}
      p={3}
      bgcolor={'white'}
      borderRadius={'lg'}
      borderWidth={1}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </Box>
  );
};

export default ChatBox;
