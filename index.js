import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import errorHandler from "./middleware/errorHandler.js";

import testRoutes from "./routes/test.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";

dotenv.config();
const app = express();

app.use((req, res, next) => {
  res.cookie("__vercel_live_token", process.env.JWT_SECRET, {
    httpOnly: true, // Çerezi sadece backend erişebilir, frontend erişemez
    secure: true, // Çerez sadece HTTPS üzerinden gönderilecek
    sameSite: "None", // Cross-site isteklerde çerez gönderilsin
    maxAge: 24 * 60 * 60 * 1000, // 1 gün süreyle geçerli
  });
  next();
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/test", testRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
//500: INTERNAL_SERVER_ERROR fixed with node 18.x
