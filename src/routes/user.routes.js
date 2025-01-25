import express from "express";
import {
    registerUser,
    loginUser,
    logOutUser,
    uploadImage,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/uploadImage", upload.single("image"), uploadImage);
export default router;