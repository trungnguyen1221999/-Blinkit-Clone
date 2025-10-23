import { UserModels } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import resendEmail from "../resendEmail/resendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplet.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { response } from "express";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        message: "Name, email and password are required",
        error: true,
        success: false,
      });
    const isExistingUser = await UserModels.findOne({ email });
    if (isExistingUser)
      return res
        .status(400)
        .json({ message: "User already exists", error: true, success: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new UserModels(payload);
    await newUser.save();
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?id=${newUser?._id}`;
    resendEmail(
      email,
      "Please verify your email",
      verifyEmailTemplate(name, verifyUrl)
    );
    return res.status(201).json({
      message: "User registered successfully and Verification email sent",
      error: false,
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "Email and password are required",
        error: true,
        success: false,
      });

    const user = await UserModels.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "User or password is incorrect",
        error: true,
        success: false,
      });
    if (!user.verify_email || user.status !== "Active")
      return res.status(403).json({
        message: "Your account is not active or has been suspended",
        error: true,
        success: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(404).json({
        message: "User or password is incorrect",
        error: true,
        success: false,
      });
    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({
      message: "User logged in successfully",
      error: false,
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const verifiedEmail = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const user = await UserModels.findById(id);
    if (!user)
      res
        .status(404)
        .json({ message: "User not found", error: true, success: false });
    await UserModels.updateOne({ _id: id }, { verify_email: true });
    res.status(200).json({
      message: "Email verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({
      message: "User logged out successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { userId } = req.user;
    const newAccessToken = generateAccessToken(userId);
    res.status(200).json({
      message: "Access token refreshed successfully",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

const editUser = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

export {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  verifiedEmail,
  logoutUser,
  refreshAccessToken,
};
