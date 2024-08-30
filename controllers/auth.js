import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AppError from "../utils/appError.js";

dotenv.config();

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User with this email already exists.", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match.", 400));
    }

    const newUser = await User.create({
      username: `${firstName} ${lastName}`,
      email,
      password, // Modelde hashleme yapıldı
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      // token,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(new AppError("User Dosen't exist", 404));
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if (!isPasswordCorrect) {
      return next(new AppError("Invalid credentials", 404));
    }

    //Geri dönerken password kaldırıldı.
    existingUser.password = undefined;

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET || "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    next(error);
  }
};
