import handler from './../../utils/ncHandler';

handler.get(async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default handler;
