import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import errorHandler from "./middleware/errorHandler.js";

import testRoutes from "./routes/test.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";

dotenv.config();
const app = express();

// Cookie parser middleware
app.use(cookieParser());

// Route to set the cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("__vercel_live_token", process.env.JWT_SECRET, {
    httpOnly: true, // JavaScript ile erişimi kapatır, güvenlik için önemli
    secure: true, // HTTPS üzerinde çalışması için gerekli (Production ortamında)
    sameSite: "none", // Cross-site erişime izin verir
  });

  res.status(200).send("Cookie has been set!");
});

// Route to check cookies
app.get("/check-cookie", (req, res) => {
  const token = req.cookies["__vercel_live_token"];
  if (token) {
    res.status(200).send(`Token received: ${token}`);
  } else {
    res.status(400).send("No token found");
  }
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", req, (res) => {
  return res.send("server running...");
});

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
