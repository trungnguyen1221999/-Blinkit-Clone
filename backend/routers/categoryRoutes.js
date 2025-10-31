import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const routerCategory = Router();

routerCategory.get("/", AuthMiddleware, getCategories);
routerCategory.post("/create", AuthMiddleware, createCategory);
routerCategory.put("/edit/:id", AuthMiddleware, updateCategory);
routerCategory.delete("/delete/:id", AuthMiddleware, deleteCategory);

export default routerCategory;
