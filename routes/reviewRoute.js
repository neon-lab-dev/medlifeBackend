import express from "express";
import { createReview, getAllReview } from "../controllers/reviewController.js";

const router = express.Router();


//create review---user
router.route("/createreview").post(createReview);


//get All review---user/Admin
router.route("/reviews").get(getAllReview);


export default router;