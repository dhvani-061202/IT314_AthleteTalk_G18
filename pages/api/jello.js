import handler from './../../utils/ncHandler';

handler.get(async (req, res) => {
  res.status(200).json({ name: 'Jane Doe' });
});

export default handler;
