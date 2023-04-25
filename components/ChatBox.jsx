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
  
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  return <div>ChatBox</div>;
};

export default ChatBox;
