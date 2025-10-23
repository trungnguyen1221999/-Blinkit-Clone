import {
  uploadMultipleImages,
  uploadSingleImage,
} from "../utils/uploadImage.js";

// === Upload single file ===
export const uploadSingleController = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: false, message: "No file uploaded" });
    }

    // Upload lên Cloudinary
    const result = await uploadSingleImage(req.file.buffer);

    res.json({
      success: true,
      error: false,
      image: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};

// === Upload multiple files ===
export const uploadMultipleController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "No files uploaded" });
    }

    // Lấy buffer của từng file
    const buffers = req.files.map((file) => file.buffer);

    // Upload nhiều ảnh cùng lúc
    const results = await uploadMultipleImages(buffers);

    res.json({
      success: true,
      error: false,
      images: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};
