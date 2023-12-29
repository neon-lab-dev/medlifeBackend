import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/lead.js";
import ErrorHandler from "../utils/errorHandler.js";

//Get all active Leads ---Admin
export const getAllActiveLeads = catchAsyncError(async (req, res, next) => {

  const name = req.query.name || "";

  const leads = await User.find({ status: "Active" ,name: {
    $regex: name,
    $options: "i",
  },});
  const counts = await User.countDocuments({ status: "Active",name: {
    $regex: name,
    $options: "i",
  }, });

  res.status(200).json({
    success: true,
    counts,
    leads,
  });
});

//Get all connected Leads ---Admin
export const getAllConnectedLeads = catchAsyncError(async (req, res, next) => {
  const name = req.query.name || "";
  const users = await User.find({ status: "Connected",name: {
    $regex: name,
    $options: "i",
  }, });
  const counts = await User.countDocuments({ status: "Connected",name: {
    $regex: name,
    $options: "i",
  }, });

  res.status(200).json({
    success: true,
    counts,
    users,
  });
});

//create leads--User
export const createLeads = catchAsyncError(async (req, res, next) => {
  const { name, email, mobileNumber, city, disease } = req.body;

  if (!name || !mobileNumber || !city || !disease)
    return next(new ErrorHandler("Please enter all deatils", 400));

  await User.create({
    name,
    email,
    mobileNumber,
    city,
    disease,
  });

  res.status(201).json({
    success: true,
    message: "We Got Your Details, We Will Contact you soon ThankYou",
  });
});

//get a specific Lead details--Admin
export const getALead = catchAsyncError(async (req, res, next) => {
  const lead = await User.findById(req.params.id);

  if (!lead) return next(new ErrorHandler("User Doesn't Exist", 400));

  res.status(200).json({
    success: true,
    lead,
  });
});

//update lead status--Admin
export const updateUserStatus = catchAsyncError(async (req, res, next) => {
  const  status  = "Connected";

  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User Doesn't Exist", 400));

  user.status = status;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Status Updated",
  });
});
