import { Appointment } from "../models/appointment.model.js";
import { Loan } from "../models/loan.model.js";
import QRCode from "qrcode";

//* Schedule an appointment for a loan
const scheduleAppointment = async (req, res) => {
    const { loanId, date, time, officeLocation } = req.body;

    if (!loanId) return res.status(400).json({ message: "Loan ID is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });
    if (!time) return res.status(400).json({ message: "Time is required" });
    if (!officeLocation) return res.status(400).json({ message: "Office location is required" });

    try {
        //* Check if the loan exists
        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }
        //* Generate a token number
        const tokenNumber = `TKN-${Date.now()}`;

        //* Generate a QR code
        const qrCode = await QRCode.toDetaUrl(tokenNumber);

        //* Create the appointment
        const newAppinment = await Appointment.create({
            loanId,
            tokenNumber,
            qrCode,
            date,
            time,
            officeLocation,
        });
        res.status(201).json({ message: "Appointment scheduled successfully", appointment: newAppinment });
    } catch (error) {
        res.status(500).json({ message: "Error scheduling appointment failed", error: error.message });

    }
};

//* Get appointment details for a loan
const getAppointmentDetails = async (req, res) => {
    const { loanId } = req.params;

    if (!loanId) return res.status(400).json({ message: "Loan ID is required" });

    try {
        const appointment = await Appointment.findOne({ loanId });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ appointment });
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointment details", error: error.message });
    }
};

export { scheduleAppointment, getAppointmentDetails };