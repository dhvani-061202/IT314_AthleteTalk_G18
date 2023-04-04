import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
const { server } = require('./../../../utils/server');