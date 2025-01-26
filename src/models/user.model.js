import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            //trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            //trim: true,
            //lowercase: true,
            //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            //minlength: [6, "Password must be at least 6 characters long"],
        },
        cnic: {
            type: String,
            required: [true, "CNIC is required"],
            unique: true,
            trim: true,
            match: [/^\d{11}$/, "Please enter a valid 11-digit CNIC number"],
        },
        phoneNumber: {
            type: String,
            trim: true,
            match: [/^\d{11}$/, "Please enter a valid phone number (e.g., 03001234567)"],
        },
        address: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export const User = mongoose.model("User", userSchema);