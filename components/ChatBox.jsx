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

import { io } from 'socket.io-client';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import server from '../server';

const ENDPOINT = `${server}/api/socket`;
var socket = io(),
  selectedChatCompare;

const ChatBox = () => {

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  
  async function socketInitializer() {
    console.log('creating socket connection');
    await fetch(`/api/socket`);

    socket = io();
    socket.emit('setup', user);
    socket.on('connection', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }

  
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  
  const sendMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);
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

        socket.emit('new message', data);

        setMessages([...messages, data]);
      } catch (error) {}
    }
  };

  return <div>ChatBox</div>;
};

export default ChatBox;
