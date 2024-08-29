import AppError from "../utils/appError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    // Operasyonel hatalar için özel yanıt
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Bilinmeyen hatalar için genel yanıt
    console.error("Unhandled Error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

export default errorHandler;
