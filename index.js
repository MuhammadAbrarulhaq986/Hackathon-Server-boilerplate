import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/user.routes.js";
import loanRoutes from "./src/routes/loan.routes.js"
import guarantorRoutes from "./src/routes/guarantor.routes.js"
import appointmentRoutes from "./src/routes/appointment.routes.js"

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        exposedHeaders: ["set-cookie"],
    })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.get("/", async (req, res) => {
    res.send("_____Hello BOSS MAN_____");
});

//* User authentication routes
app.use("/api/v1/auth", authRoutes);
//* Loan routes
app.use("/api/v1/loans", loanRoutes);
//* Guarantor routes
app.use("/api/v1/guarantors", guarantorRoutes);
//* Appointment routes
app.use("/api/v1/appointments", appointmentRoutes);

//* Database connections and server start
(async () => {
    try {
        const res = await connectDB();
        console.log(res);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();