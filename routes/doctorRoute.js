import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getsingleDoctor,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import singleUpload from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

//create doctor---Admin
router.route("/createdoctor").post(isAuthenticated,singleUpload, createDoctor);

//get all doctor---Admin
router.route("/doctors").get(getAllDoctors);

//get/update single doctor---Admin
router
  .route("/doctor/:id")
  .get(isAuthenticated,getsingleDoctor)
  .put(isAuthenticated,singleUpload, updateDoctorProfile)
  .delete(isAuthenticated,deleteDoctor);

export default router;
