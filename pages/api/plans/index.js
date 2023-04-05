import mongoose from 'mongoose';
import Plan from '../../../models/planModel';

const nc = require('next-connect');
const catchAsync = require('../../../utils/catchAsync');
const authController = require('./../../../controllers/authController');
const dbConnect = require('./../../../lib/mongoose');

const handler = nc({
  onError: authController.handleError,
  onNoMatch: authController.handleNoMatch,
});

handler.get(
  authController.protect,
  catchAsync(async (req, res, next) => {
    const plans = await Plan.find({}).populate('creator');

    res.status(200).json({
      status: 'success',
      results: plans.length,
      data: {
        plans,
      },
    });
  })
);

export default handler;