import { Router } from "express";
import {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  logoutUser,
  refreshAccessToken,
  verifiedEmail,
  uploadAvatar,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../controllers/usersController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

// POST /api/user/register - Đăng ký user mới
userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifiedEmail);

// POST /api/user/login - Đăng nhập user
userRouter.post("/login", loginUser);
userRouter.post("/logout", AuthMiddleware, logoutUser);
userRouter.post("/refresh-accessToken", AuthMiddleware, refreshAccessToken);
// PUT /api/user/edit/:id - Chỉnh sửa thông tin user
userRouter.put("/edit", AuthMiddleware, editUser);
userRouter.put(
  "/upload-avatar, authMiddleware",
  upload.single("avatar"),
  uploadAvatar
);
userRouter.put("/forgot-password", forgotPassword);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOTP);
userRouter.put("/reset-password", resetPassword);
// DELETE /api/user/delete/:id - Xóa user
userRouter.delete("/delete/:id", AuthMiddleware, deleteUser);

export default userRouter;
