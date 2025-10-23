import cloudinary from "../config/cloudinaryConfig.js";

// Upload 1 ảnh từ URL hoặc local path
export const uploadSingleImage = async (imagePathOrUrl) => {
  try {
    const result = await cloudinary.uploader.upload(imagePathOrUrl, {
      folder: "uploads", // optional: lưu vào folder "uploads"
    });
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

// Upload nhiều ảnh từ mảng URL hoặc path
export const uploadMultipleImages = async (images) => {
  try {
    const promises = images.map((img) => uploadSingleImage(img));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Multiple upload error:", error);
    throw error;
  }
};

// Tạo URL tối ưu hóa ảnh
export const getOptimizedUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Tạo URL transform (crop auto, square)
export const getAutoCropUrl = (publicId, width = 500, height = 500) => {
  return cloudinary.url(publicId, {
    crop: "fill",
    gravity: "auto",
    width,
    height,
  });
};
