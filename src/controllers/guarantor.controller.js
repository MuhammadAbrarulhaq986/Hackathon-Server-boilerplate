import { Guarantor } from "../models/guarantor.model.js";
import { Loan } from "../models/loan.model.js";

//* Add a guarantor to a loan
const addGuarantor = async (req, res) => {
    const { loanId, name, email, cnic, location } = req.body;

    if (!loanId) return res.status(400).json({ message: "Loan ID is required" });
    if (!name) return res.status(400).json({ message: "Guarantor name is required" });
    if (!email) return res.status(400).json({ message: "Guarantor email is required" });
    if (!cnic) return res.status(400).json({ message: "Guarantor CNIC is required" });
    if (!location) return res.status(400).json({ message: "Guarantor location is required" });

    try {
        //* Check if the loan exists
        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        //* Create the guarantor
        const newGuarantor = await Guarantor.create({
            loanId,
            name,
            email,
            cnic,
            location
        });
        res
            .status(201)
            .json({
                message: "Guarantor added successfully",
                guarantor: newGuarantor,
            });

    } catch (error) {
        res.status(500).json({ message: "Error adding guarantor", error: error.message });
    }

}
//* Get all guarantor for a loan
const getLoanGuarantors = async (req, res) => {
    const { loanId } = req.params;

    if (!loanId) return res.status(400).json({ message: "Loan ID is required" });

    try {
        const guarantors = await Guarantor.find({ loanId });
        res.status(200).json({ guarantors });

    } catch (error) {
        res.status(500).json({ message: "Error fetching guarantors", error: error.message });
    }
}


export { addGuarantor, getLoanGuarantors };