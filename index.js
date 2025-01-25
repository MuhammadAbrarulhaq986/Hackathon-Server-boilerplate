import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/user.routes.js";
dotenv.config();

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
const PORT = process.env.PORT || 3000;
app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);

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