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
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newCategory = new CategoryModels({ name, image });
    await newCategory.save();

    res.status(201).json(newCategory);
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

    const deletedCategory = await CategoryModels.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getCategories, createCategory, updateCategory, deleteCategory };
