// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./database/mongobd.js";
import userRouter from "./routers/userRouter.js";

// Load environment variables
dotenv.config();

// Create an instance of an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Global Middlewares
app.use(express.json()); // parse JSON body

app.use(cookieParser(process.env.COOKIE_SECRET)); // parse cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true, // allow sending cookies
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false, // disable CSP if you have inline scripts in frontend
  })
);
app.use(morgan("dev")); // log HTTP requests

// Routes
app.get("/", (req, res) => {
  res.send("✅ Server is running and CORS is enabled!");
});

app.use("/api/user", userRouter); // User routes
// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
