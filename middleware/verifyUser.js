import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("TOKEN :", token);
    if (token) {
      console.log("TOKEN :", token);
      jwt.verify(token, process.env.JWT_SECRET || "test", (err, user) => {
        if (err) {
          return next(new AppError("Unautorized", 401));
        }

        console.log("User :", user);

        req.user = user;
        next();
      });
    } else {
      res.status(401).message({ message: "Invalid" });
    }
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed Token...",
    });
  }
};
