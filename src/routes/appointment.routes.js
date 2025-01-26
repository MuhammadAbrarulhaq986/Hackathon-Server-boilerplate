import express from "express";
import { getAppointmentDetails, scheduleAppointment } from "../controllers/appointment.controller.js";


const router = express.Router();

//* Schedule an appointment for a loan
router.post("/", scheduleAppointment);

//* Get appointment details fro a loan
router.get("/loan/:loanId", getAppointmentDetails);

export default router;
