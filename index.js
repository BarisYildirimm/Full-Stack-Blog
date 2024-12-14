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

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

import cors from "cors";
import express from "express";

const app = express();

// Üretim ortamındaki ve geliştirme ortamındaki origin listelerini ayarlayalım
const devOrigins = ["http://localhost:5000"]; // Geliştirme ortamındaki izin verilen domain
const prodOrigins = ["https://eunike-client.vercel.app"]; // Üretim ortamındaki izin verilen domain

// Orgin ve ortamı kontrol ederek doğru listeyi seçiyoruz
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigins;

// CORS Middleware'i ekleyin
app.use(
  cors({
    origin: (origin, callback) => {
      // Eğer origin yoksa (yani CORS denetimi gerektirmeyen iç isteklerse), geçişe izin ver
      if (!origin) {
        callback(null, true);
        return;
      }

      // Eğer origin izin verilenler arasında varsa, istek kabul edilir
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Eğer origin izin verilen listede yoksa, hata veririz
        callback(new Error(`${origin} is not allowed by CORS`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Desteklenen HTTP metodları
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // İzin verilen başlıklar
    credentials: true, // Çerezlerin paylaşılmasına izin verir
    preflightContinue: false, // Preflight isteklerinin sonrasında herhangi bir işlem yapılmaz
    optionsSuccessStatus: 204, // Preflight için başarı durumu
  })
);

// Örnek bir GET endpoint
app.get("/test", (req, res) => {
  res.json({ message: "CORS çalışıyor!" });
});

// Hata middleware'i
app.use((err, req, res, next) => {
  if (err) {
    res.status(403).json({ error: err.message }); // CORS hatası ile ilgili yanıt
  } else {
    next();
  }
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
