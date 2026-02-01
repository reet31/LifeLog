import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import diaryroutes from "./routes/diaryroutes.js";
import cors from "cors";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(cors(
    {origin:"http://localhost:3000",
    credentials:true
}
));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", diaryroutes);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
connectdb();

//routes 
app.get("/", (req, res) => {
  res.send("Welcome to the Life Log API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



