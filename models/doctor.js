import mongoose from "mongoose";

const schema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: [true, "Please Enter your doctor name"],
  },
  education: {
    type: String,
    required: [true, "Please Enter your doctor education like MBBS ,MS"],
  },
  experience: {
    type: String,
    required: [true, "Please Enter your doctor experience in years"],
  },
  location: {
    type: String,
    required: [true, "Please Enter your doctor location"],
  },
  diseaseHandle: {
    type: String,
    required: [
      true,
      "Please Enter your doctor designation like lyproscopy,gynacalology",
    ],
  },
  specialization1: {
    type: String,
    required: [true, "Please Enter your doctor specialization like surgery"],
  },
  specialization2: {
    type: String,
    required: [true, "Please Enter your doctor specialization like surgery"],
  },
  specialization3: {
    type: String,
    required: [true, "Please Enter your doctor specialization like surgery"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Doctor = mongoose.model("Doctor", schema);
