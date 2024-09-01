import express from "express";
import { getUsers, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
