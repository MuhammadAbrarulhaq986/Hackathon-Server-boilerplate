import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
//import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// REGISTER USER
router.route("/register").post(
    upload.fields([
        {
            //name: "avatar",
            //maxCount: 1,
        },
        {
            //name: "coverImage",
            //maxCount: 1,
        }
    ]),
    registerUser
);

// LOGIN USER
router.route("/login").post(loginUser);

// LOGOUT USER
router.route("/logout").post(logoutUser);

// GET ALL USERS
router.route("/users").get(getAllUsers);

export default router;