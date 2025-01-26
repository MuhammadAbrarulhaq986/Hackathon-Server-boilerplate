import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //required: [true, "User ID is required"],
        },
        category: {
            type: String,
            required: [true, "Loan category is required"],
            enum: ["Wedding", "Home Construction", "Business Startup", "Education"],
        },
        subcategory: {
            type: String,
            required: [true, "Loan subcategory is required"],
        },
        loanAmount: {
            type: Number,
            required: [true, "Loan amount is required"],
            min: [0, "Loan amount cannot be negative"],
        },
        loanPeriod: {
            type: Number,
            required: [true, "Loan period is required"],
            min: [1, "Loan period must be at least 1 year"],
        },
        initialDeposit: {
            type: Number,
            default: 0,
            min: [0, "Initial deposit cannot be negative"],
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },

    },
    {
        timestamps: true,
    }
);


export const Loan = mongoose.model("Loan", loanSchema);