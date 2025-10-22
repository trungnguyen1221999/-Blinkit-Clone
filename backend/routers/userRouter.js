import { Router } from "express";
import {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
} from "../controllers/usersController.js";

const userRouter = Router();

// POST /api/user/register - Đăng ký user mới
userRouter.post("/register", registerUser);

// POST /api/user/login - Đăng nhập user
userRouter.post("/login", loginUser);

userRouter.post("/verify-email", verifiedEmail);

// PUT /api/user/edit/:id - Chỉnh sửa thông tin user
userRouter.put("/edit/:id", editUser);

// DELETE /api/user/delete/:id - Xóa user
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
