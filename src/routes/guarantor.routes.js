import express from "express";
import {
    addGuarantor,

} from "../controllers/guarantor.controller.js";

const router = express.Router();

//* Add a guarantor to a loan
router.post("/", addGuarantor);

//* Get All guarantor for a loan
router.get("/loan/:loanId",);

export default router;
