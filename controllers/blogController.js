import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { Blog } from "../models/blog.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

//create Blog---Admin
export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, about } = req.body;

  const file = req.file;

  if (!title || !about || !file)
    return next(
      new ErrorHandler("Please enter all deatils and provide blog pic", 400)
    );

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Blog.create({
    title,
    about,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Blog Created successfully",
  });
});

//get all blog
export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

  res.status(200).json({
    success: true,
    blogs,
  });
});

//get a single blog
export const getsingleBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return next(new ErrorHandler("Blog not found", 400));

  res.status(200).json({
    success: true,
    blog,
  });
});

//delete a blog ---Admin
export const deleteBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return next(new ErrorHandler("Blog not found", 400));

  await cloudinary.v2.uploader.destroy(blog.avatar.public_id);

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully",
  });
});

// Combined update function for doctor details and profile picture
export const updateBlog = catchAsyncError(async (req, res, next) => {
  const { title, about } = req.body;

  const file = req.file; // Assuming you are using multer or similar middleware for file uploads

  const blog = await Blog.findById(req.params.id);

  if (title) blog.title = title;
  if (about) blog.about = about;

  if (!blog.avatar) {
    blog.avatar = {};
  }

  if (file) {
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    // Destroy existing avatar if present
    if (blog.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(blog.avatar.public_id);
    }

    blog.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
  });
});
