import {
  Box,
  FilledInput,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ScrollableChat from './ScrollableChat';

const ChatBox = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      // Send message to server
      try {
        setNewMessage('');

        const responseData = await fetch(`/api/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            content: newMessage,
          }),
        });

        const data = await responseData.json();
        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {}
    }
  };
  const fetchMessages = async () => {
    if (selectedChat.chatName) {
      setLoading(true);
      try {
        const responseData = await fetch(`/api/message/${selectedChat._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await responseData.json();

        setMessages(data);
        console.log(data);
        setLoading(false);
      } catch (error) {}
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <Paper
      elevation={1}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Box>
        <Typography
          p={2}
          width={'100%'}
          height={'fit-content'}
          alignItems={'center'}
          variant="h4"
        >
          {selectedChat.chatName && selectedChat.chatName.toUpperCase()}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        p={1}
        bgcolor={'#fff'}
        width={'100%'}
        height={'100%'}
        borderRadius={'lg'}
        sx={{ overflowY: 'hidden' }}
      >
        {/* Messages here */}
        {loading && <p>Loading...</p>}
        {!loading && (
          <Box>
            {/* Messages */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
              }}
            >
              <ScrollableChat messages={messages} />
            </Box>
            <FormControl fullWidth>
              <TextField
                onKeyDown={sendMessage}
                fullWidth
                id="outlined-basic"
                label="Enter your message"
                variant="outlined"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ChatBox;
