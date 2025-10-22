// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./database/mongobd.js";
// Create an instance of an Express application
const app = express();

// Use the cors middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
  })
);
connectDB();
app.use(cookieParser());
// Define a route
app.get("/", (req, res) => {
  res.send("CORS is enabled!");
});

app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
