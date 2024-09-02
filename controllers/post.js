import Post from "../models/post.js";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";
import chalk from "chalk";

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

export const getposts = async (req, res, next) => {
  console.log("ID:", req.query.postId); // Konsola ID'yi yazdır

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Sorgu nesnesini oluştur
    let query = {};

    if (req.query.postId) {
      // Eğer `postId` varsa, sadece bu ID'ye sahip postları bul
      const postId = req.query.postId;

      // `postId`'nin geçerli bir ObjectId olup olmadığını kontrol et
      if (mongoose.Types.ObjectId.isValid(postId)) {
        query = { _id: new mongoose.Types.ObjectId(postId) };
      } else {
        // Eğer geçerli değilse, boş bir dizi döndür
        return res.status(400).json({ message: "Invalid postId format" });
      }
    } else {
      // `postId` yoksa, diğer filtreleme kriterlerini uygula
      query = {
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      };
    }

    // Postları bul
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Toplam post sayısını bul
    const totalPosts = await Post.countDocuments();

    // Son bir ayda oluşturulan post sayısını bul
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Yanıtı gönder
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
    console.log(posts, totalPosts, lastMonthPosts);
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(new AppError("You are not allowed to delete this post", 403));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
