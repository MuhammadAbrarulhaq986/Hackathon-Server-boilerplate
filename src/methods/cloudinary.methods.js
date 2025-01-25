import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

// Cloudinary Configs
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (localFile) => {
    try {
        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto",
        });

        fs.unlink(localFile, (err) => {
            if (err) console.log("Error deleting local file:", err);
        });
        return response.url;
    } catch (error) {
        console.log(error);
        return "Error in uploading file to cloudinary", error;
    }
};

export { uploadImageToCloudinary };