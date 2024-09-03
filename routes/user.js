import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getUsers", verifyToken, getUsers);
export default router;
