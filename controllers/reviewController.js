import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Review } from "../models/Review.js";
import ErrorHandler from "../utils/errorHandler.js";

//create leads--User
export const  createReview = catchAsyncError(async (req, res, next) => {
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
    message: "Thank You for your feeback",
  });
});

//Get all reviews---user
export const getAllReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.find({ status: 'Approved' });
  const counts = await Review.countDocuments({ status: 'Approved' });

  res.status(200).json({
    success: true,
    counts,
    review,
  });
});




//Get all reviews---Admin
export const getAllAdminReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.find({ status: 'NotActive' });
  const counts = await Review.countDocuments({ status: 'NotActive' });

  res.status(200).json({
    success: true,
    counts,
    review,
  });
});




//update review--Admin
export const updateReviewStatus = catchAsyncError(async (req, res, next) => {
  const status = "Approved";

  const review = await Review.findById(req.params.id);

  if (!review) return next(new ErrorHandler("Review Doesn't Exist", 400));

  review.status = status;

  await review.save();

  res.status(200).json({
    success: true,
    message: "Review Updated",
  });
});


//delete Review ---Admin
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) return next(new ErrorHandler("review not found", 400));

  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});