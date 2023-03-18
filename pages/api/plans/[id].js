import Video from '../../../models/videoModel';

const nc = require('next-connect');
const catchAsync = require('../../../utils/catchAsync');
const authController = require('./../../../controllers/authController');
const Plan = require('../../../models/planModel');

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

handler.get(
  authController.protect,
  catchAsync(async (req, res, next) => {
    const { id } = req.query;

    let plan = await Plan.findById(id)
      .populate('creator')
      .populate('categories');

    console.log(typeof plan);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  })
);

export default handler;
