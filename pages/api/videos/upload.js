import multer from 'multer';
import nc from 'next-connect';
import fs from 'fs';
import path from 'path';
const User = require('./../../../models/userModel');
const Category = require('./../../../models/categoryModel');
const Video = require('./../../../models/videoModel');
const dbConnect = require('./../../../lib/mongoose');
const authController = require('./../../../controllers/authController');

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir =
      process.env.NODE_ENV === 'development' ? `${__dirname}` : '/tmp';
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});