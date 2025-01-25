import {
    generateAccessToken,
    generateRefreshToken,
    decryptPassword,
} from "../methods/authenticationMethods.js";
import { uploadImageToCloudinary } from "../methods/cloudinary.methods.js";
import { sentEmail } from "../methods/nodemailer.methods.js";
import { userModel } from "../models/user.models.js";

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
        return res.status(400).json({ message: "Password is required" });

    const ifEmailFound = await userModel.findOne({ email });
    if (ifEmailFound)
        return res.status(400).json({ message: "Email already exists" });
    try {
        const newUser = await userModel.create({
            name: name,
            email,
            password,
        });
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const subject = "Welcome to my app";
        const message = `<h1>Hello ${name}</h1>
      <h3>Welcome to our ecommerce app !</h3>
      <p>Thanks for registering to our platform</p>`;

        await sentEmail(email, subject, message);

        res.status(201).json({
            message: "User registered successfully",
            data: newUser,
            ACCESS_TOKEN: accessToken,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
        return res.status(400).json({ message: "Password is required" });

    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res
            .status(404)
            .json({ message: "No user exists with this email address" });
    }

    const isValidPassword = await decryptPassword(password, user?.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect password" });
    } else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
            http: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "User logged in successfully",
            data: user,
            ACCESS_TOKEN: accessToken,
        });
    }
};

const uploadImage = async (req, res) => {
    const image = req.file.path || req.body.image;
    if (!image) {
        return res.status(400).json({ message: "Image is required" });
    }
    try {
        const link = await uploadImageToCloudinary(image);
        return res
            .status(200)
            .json({ message: "Image uploaded successfully", link });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const logOutUser = async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User logged out successfully" });
};
export { registerUser, loginUser, logOutUser, uploadImage };