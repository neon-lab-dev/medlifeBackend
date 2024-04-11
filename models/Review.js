import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please Enter your mobile number"],
    maxLength: [10, "mobile cannot be greater than 10 characters"],
    minLength: [10, "mobile must be at least 10 characters"],
  },
  city: {
    type: String,
  },
  review: {
    type: String,
    required: [true, "Please Enter your review"],
  },
  ratings: {
    type: Number,
    required: [true, "Please Enter your ratings"],
  },
  doctor: {
    type: String,
  },
  disease: {
    type: String,
  },
  status:{
    type:String,
    default:"NotActive"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Review = mongoose.model("Review", schema);
