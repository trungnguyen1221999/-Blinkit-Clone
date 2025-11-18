import { v2 as cloudinary } from "cloudinary";

import CategoryModels from "../models/categoryModels.js";
// Lấy danh sách tất cả category
const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModels.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Thêm category mới
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existedCategory = await CategoryModels.findOne({ name });
    if (existedCategory) {
      return res.status(400).json({ message: "Category name already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload ảnh lên Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "categories" }, // optional: tổ chức folder
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        // Lưu vào database
        const newCategory = new CategoryModels({
          name,
          image: {
            url: result.secure_url,
            public_id: result.public_id,
          },
        });

        await newCategory.save();
        return res.status(201).json(newCategory);
      }
    );

    // Gửi buffer vào Cloudinary stream
    result.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cập nhật category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const updatedCategory = await CategoryModels.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Xóa category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModels.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Xóa ảnh nếu có
    if (category.image && category.image.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    // Xóa category trong DB
    await CategoryModels.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getCategories, createCategory, updateCategory, deleteCategory };
