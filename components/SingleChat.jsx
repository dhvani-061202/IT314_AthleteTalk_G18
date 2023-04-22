import { Box, Typography } from '@mui/material';
import React from 'react';
import UpdateGroupChatModel from './UpdateGroupChatModel';

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
}) => {
  if (!selectedChat)
    return (
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height="100%"
      >
        <Typography variant="h5">Select a chat to start messaging</Typography>
      </Box>
    );
  return (
    <>
      <Typography
        variant="h4"
        pb={3}
        px={2}
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {selectedChat.isGroupChat && selectedChat.chatName}
        {selectedChat.isGroupChat && (
          <UpdateGroupChatModel
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        )}
        {!selectedChat.isGroupChat && selectedChat.chatName}
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        p={3}
        bgcolor={'#f5f5f5'}
        width={'100%'}
        height={'100%'}
        borderRadius={1}
        sx={{ overflowY: 'hidden' }}
      >
        {/* Messages here */}
      </Box>
    </>
  );
};

export default SingleChat;
