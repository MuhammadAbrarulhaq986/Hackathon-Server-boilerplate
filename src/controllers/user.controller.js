import {
    generateAccessToken,
    generateRefreshToken,
    decryptPassword,
} from "../methods/authenticationMethods.js";
//import { uploadImageToCloudinary } from "../methods/cloudinary.methods.js";
// import { sentEmail } from "../methods/nodemailer.methods.js"; // Commented out Nodemailer import
import { User } from "../models/user.model.js";

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, cnic, phoneNumber, address } = req.body;

    // Validate required fields
    if (!username) return res.status(400).json({ message: "username is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!cnic) return res.status(400).json({ message: "CNIC is required" });

    try {
        // Check if email or CNIC already exists
        const ifEmailFound = await User.findOne({ email });
        if (ifEmailFound) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const ifCnicFound = await User.findOne({ cnic });
        if (ifCnicFound) {
            return res.status(400).json({ message: "CNIC already exists" });
        }

        // Create the user
        const newUser = await User.create({
            username,
            email,
            password, // Password will be hashed by the pre-save hook in the model
            cnic,
            phoneNumber,
            address,
        });

        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Set refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Respond with success
        res.status(201).json({
            message: "User registered successfully",
            data: newUser,
            ACCESS_TOKEN: accessToken, // Kept as per your request
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No user exists with this email address" });
        }

        // Compare passwords
        const isValidPassword = await decryptPassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Respond with success
        res.status(200).json({
            message: "User logged in successfully",
            data: user,
            ACCESS_TOKEN: accessToken, // Kept as per your request
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Upload an image
//const uploadImage = async (req, res) => {
//    const image = req.file?.path || req.body.image;

//    // Validate image
//    if (!image) {
//        return res.status(400).json({ message: "Image is required" });
//    }

//    try {
//        // Upload image to Cloudinary
//        const link = await uploadImageToCloudinary(image);
//        res.status(200).json({ message: "Image uploaded successfully", link });
//    } catch (error) {
//        res.status(500).json({ message: "Error uploading image", error: error.message });
//    }
//};

// Logout a user
const logOutUser = async (req, res) => {
    try {
        // Clear the refresh token cookie
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};

export { registerUser, loginUser, logOutUser };