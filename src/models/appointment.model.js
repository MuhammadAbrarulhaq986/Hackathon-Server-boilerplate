import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        loanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Loan",
            required: [true, "Loan ID is required"],
        },
        tokenNumber: {
            type: String,
            required: [true, "Token number is required"],
            unique: true,
        },
        qrCode: {
            type: String,
            required: [true, "QR code is required"],
        },
        date: {
            type: Date,
            required: [true, "Appointment date is required"],
        },
        time: {
            type: String,
            required: [true, "Appointment time is required"],
        },
        officeLocation: {
            type: String,
            required: [true, "Office location is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);