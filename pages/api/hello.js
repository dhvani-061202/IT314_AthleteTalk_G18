const nc = require('next-connect');

const handler = nc();
handler.get(async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;
