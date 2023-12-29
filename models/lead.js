import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
  },
  mobileNumber:{
    type:Number,
    required: [true, "Please Enter your mobile number"],
    maxLength: [10, "mobile cannot be greater than 10 characters"],
    minLength: [10, "mobile must be at least 10 characters"],
  },
  city:{
    type: String,
    required: [true, "Please Enter your city"],
  },
  disease:{
    type: String,
    required: [true, "Please Enter your disease"],
  },
  status:{
    type:String,
    default:"Active"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const User = mongoose.model("User", schema);
