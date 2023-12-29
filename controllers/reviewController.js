import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Review } from "../models/Review.js";
import ErrorHandler from "../utils/errorHandler.js";

//create leads--User
export const createReview = catchAsyncError(async (req, res, next) => {
  const { name, mobileNumber, city, disease, review, doctor, ratings } =
    req.body;

  if (!name || !mobileNumber || !review || !ratings)
    return next(new ErrorHandler("Please enter all deatils", 400));

  await Review.create({
    name,
    mobileNumber,
    city,
    disease,
    review,
    doctor,
    ratings,
  });

  res.status(201).json({
    success: true,
    message: "Your review is submitted",
  });
});

//Get all reviews---Admin/user
export const getAllReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.find();
  const counts = await Review.countDocuments();

  res.status(200).json({
    success: true,
    counts,
    review,
  });
});
