import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema(
    {
        loanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Loan",
            required: [true, "Loan ID is required"],
        },
        name: {
            type: String,
            required: [true, "Guarantor name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Guarantor email is required"],
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
        },
        cnic: {
            type: String,
            required: [true, "Guarantor CNIC is required"],
            trim: true,
            match: [/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC (e.g., 12345-1234567-1)"],
        },
        location: {
            type: String,
            required: [true, "Guarantor location is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Guarantor = mongoose.model("Guarantor", guarantorSchema);