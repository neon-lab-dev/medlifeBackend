import express from "express";
import singleUpload from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { createBlog, deleteBlog, getAllBlogs, getsingleBlog, updateBlog } from "../controllers/blogController.js";

const router = express.Router();

//create doctor---Admin
router.route("/createblog").post(isAuthenticated, singleUpload, createBlog);

//get all blog
router.route("/blogs").get(getAllBlogs);

//get a single blog
router.route("/blog/:id").get(getsingleBlog).delete(deleteBlog).put(updateBlog);

export default router;