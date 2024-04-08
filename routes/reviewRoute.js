import express from "express";
import { createReview, deleteReview, getAllAdminReview, getAllReview, updateReviewStatus } from "../controllers/reviewController.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();


//create review---user
router.route("/createreview").post(createReview);


//get All review---user
router.route("/reviews").get(getAllReview);


//get All Admin review
router.route("/areviews").get(isAuthenticated,getAllAdminReview);

//update review status
router.route("/reviewstatus/:id").put(isAuthenticated,updateReviewStatus).delete(deleteReview);



export default router;