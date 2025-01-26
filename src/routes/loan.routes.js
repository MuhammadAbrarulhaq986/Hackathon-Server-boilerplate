import express from "express";
import { createLoan, getUserLoans, updateLoanStatus } from "../controllers/loan.controller.js";

const router = express.Router();

//* Create a new loan 
router.post("/createLoan", createLoan);

//* Get all loans for a user
router.get("/user/:userId", getUserLoans);

//* Update loan status Approve or Reject
router.put("/loanId/status", updateLoanStatus);

export default router;
