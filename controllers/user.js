import express from "express";
import User from "../models/user.js";
import AppError from "../utils/appError.js";

export const getUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(new AppError("You are not allowed to update this user", 403));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(new AppError("Password must be at least 6 characters", 400));
    }
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        new AppError("Username must be between 7 and 20 characters,", 400)
      );
    }
    if (req.body.username.includes(" ")) {
      return next(new AppError("Username cannot contain spaces", 400));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(new AppError("Username must be lowercase", 400));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        new AppError(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
