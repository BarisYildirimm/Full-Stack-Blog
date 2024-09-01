import Post from "../models/post.js";
import AppError from "../utils/appError.js";

export const create = async (req, res, next) => {
  console.log("create POST:", req.user);
  if (!req.user.isAdmin) {
    return next(new AppError("You are not allowed to create a post", 403));
  }
  if (!req.body.title || !req.body.content) {
    return next(new AppError("Please provide all required fields", 400));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
