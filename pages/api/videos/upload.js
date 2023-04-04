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

let upload = multer({ storage: storage }).single('file');

handler.use(upload);

import { google } from 'googleapis';

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFilename: path.resolve('./driveToken.json'),
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  return auth;
};

const delteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ['1boTQtsxeCHDdudRHDF_z-_GA2aqywwcp'],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: 'v3', auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
  });

  delteFile(file.path);
  return response;
};
