import express from "express";
import multer from "multer";
import {
  uploadMultipleController,
  uploadSingleController,
} from "../controllers/uploadController.js";

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single file
router.post("/single", upload.single("image"), uploadSingleController);

// Multiple files
router.post("/multiple", upload.array("images", 10), uploadMultipleController);

export default router;
