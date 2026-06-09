import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import authRoutes from "./routes/auth/auth.js"

dotenv.config();

const app = express();

app.use(cors({
	origin: process.env.CLIENT_URL || "http://localhost:5173", //default
	credentials: true, // enabling cookies to be sent to requests
}));
app.use(express.json()) 
app.use(cookieParser()) 
app.use("/api/auth", authRoutes)


app.listen(5000, () => {
  console.log("Hi")
})