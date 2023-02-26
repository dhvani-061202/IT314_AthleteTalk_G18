import multer from "multer";
import nc from "next-connect";
import fs from "fs";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ err: err, errStack: err.stack });
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ err: "Page is not found" });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `/tmp`);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage }).single("file");

handler.use(upload);

import { google } from "googleapis";

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `driveToken.json`,
    scopes: "https://www.googleapis.com/auth/drive",
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
    parents: ["1boTQtsxeCHDdudRHDF_z-_GA2aqywwcp"],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
  });

  delteFile(file.path);
  return response;
};

handler.post(async (req, res) => {
  let auth = await authenticateGoogle();
  let file_response = await uploadToGoogleDrive(req.file, auth);
  console.log(file_response);
  res.status(200).send({ message: "File Uploaded", publicUrl: req.file.path });
});

export default handler;
