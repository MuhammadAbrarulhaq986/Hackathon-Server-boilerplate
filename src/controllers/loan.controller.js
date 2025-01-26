import { Loan } from "../models/loan.model.js";
import { User } from "../models/user.model.js";

// Create a new loan
const createLoan = async (req, res) => {
    const { userId, category, subcategory, loanAmount, loanPeriod, initialDeposit } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!category) return res.status(400).json({ message: "Loan category is required" });
    if (!subcategory) return res.status(400).json({ message: "Loan subcategory is required" });
    if (!loanAmount) return res.status(400).json({ message: "Loan amount is required" });
    if (!loanPeriod) return res.status(400).json({ message: "Loan period is required" });

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create the loan
        const newLoan = await Loan.create({
            userId,
            category,
            subcategory,
            loanAmount,
            loanPeriod,
            initialDeposit: initialDeposit || 0,
        });

        res.status(201).json({ message: "Loan created successfully", loan: newLoan });
    } catch (error) {
        res.status(500).json({ message: "Error creating loan", error: error.message });
    }
};

// Get all loans for a user
const getUserLoans = async (req, res) => {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    try {
        const loans = await Loan.find({ userId }).populate("userId");
        res.status(200).json({ loans });
    } catch (error) {
        res.status(500).json({ message: "Error fetching loans", error: error.message });
    }
};

// Update loan status (e.g., Approve or Reject)
const updateLoanStatus = async (req, res) => {
    const { loanId } = req.params;
    const { status } = req.body;

    if (!loanId) return res.status(400).json({ message: "Loan ID is required" });
    if (!status) return res.status(400).json({ message: "Status is required" });

    try {
        const updatedLoan = await Loan.findByIdAndUpdate(
            loanId,
            { status },
            { new: true }
        );

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json({ message: "Loan status updated successfully", loan: updatedLoan });
    } catch (error) {
        res.status(500).json({ message: "Error updating loan status", error: error.message });
    }
};

export { createLoan, getUserLoans, updateLoanStatus };