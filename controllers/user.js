import express from "express";
import User from "../models/user.js";

export const getUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
