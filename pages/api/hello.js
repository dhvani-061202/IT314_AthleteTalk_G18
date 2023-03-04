const nc = require('next-connect');
const dbConnect = require('./../../lib/mongoose');
const Video = require('./../../models/videoModel');

const handler = nc();
handler.get(async (req, res) => {
  await dbConnect();

  const videos = await Video.find({});

  res.status(200).json({ videos });
});

export default handler;
