import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Doctor } from "../models/doctor.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

//create Doctor---Admin
export const createDoctor = catchAsyncError(async (req, res, next) => {
  const {
    doctorName,
    education,
    experience,
    location,
    diseaseHandle,
    specialization1,
    specialization2,
    specialization3,
  } = req.body;

  const file = req.file;

  if (
    !doctorName ||
    !education ||
    !experience ||
    !location ||
    !diseaseHandle ||
    !specialization1 ||
    !specialization2 ||
    !specialization3 ||
    !file
  )
    return next(
      new ErrorHandler("Please enter all deatils and provide doctor pic", 400)
    );

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Doctor.create({
    doctorName,
    education,
    experience,
    location,
    diseaseHandle,
    specialization1,
    specialization2,
    specialization3,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Doctor Created successfully",
  });
});

//Get all doctors ---Admin
export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctorName = req.query.doctorName || "";
  const diseaseHandle = req.query.diseaseHandle || "";

  const doctors = await Doctor.find({
    doctorName: {
      $regex: doctorName,
      $options: "i",
    },
    diseaseHandle: {
      $regex: diseaseHandle,
      $options: "i",
    },
  }).sort({ createdAt: -1 }).lean();

  const counts = await Doctor.countDocuments({
    doctorName: {
      $regex: doctorName,
      $options: "i",
    },
    diseaseHandle: {
      $regex: diseaseHandle,
      $options: "i",
    },
  });

  res.status(200).json({
    success: true,
    counts,
    doctors,
  });
});

//Get a doctor ---Admin
export const getsingleDoctor = catchAsyncError(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) return next(new ErrorHandler("Doctor not found", 400));

  res.status(200).json({
    success: true,
    doctor,
  });
});

//delete a doctor ---Admin
export const deleteDoctor = catchAsyncError(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) return next(new ErrorHandler("Doctor not found", 400));

  await cloudinary.v2.uploader.destroy(doctor.avatar.public_id);

  await doctor.deleteOne();

  res.status(200).json({
    success: true,
    message: "Doctor Deleted Successfully",
  });
});

// Combined update function for doctor details and profile picture
export const updateDoctorProfile = catchAsyncError(async (req, res, next) => {
  const {
    doctorName,
    education,
    experience,
    location,
    diseaseHandle,
    specialization1,
    specialization2,
    specialization3,
  } = req.body;

  const file = req.file; // Assuming you are using multer or similar middleware for file uploads

  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return next(new ErrorHandler("Doctor not found", 400));

  // Update textual details
  if (doctorName) doctor.doctorName = doctorName;
  if (education) doctor.education = education;
  if (experience) doctor.experience = experience;
  if (location) doctor.location = location;
  if (diseaseHandle) doctor.diseaseHandle = diseaseHandle;
  if (specialization1) doctor.specialization1 = specialization1;
  if (specialization2) doctor.specialization2 = specialization2;
  if (specialization3) doctor.specialization3 = specialization3;

  // Update profile picture
  if (file) {
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(doctor.avatar.public_id);

    doctor.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  await doctor.save();

  res.status(200).json({
    success: true,
    message: "Doctor profile updated successfully",
  });
});
