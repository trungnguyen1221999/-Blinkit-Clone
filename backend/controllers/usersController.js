import { UserModels } from "../models/userModels.js";
import bcrypt from "bcryptjs";
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
    return res
      .status(201)
      .json({
        message: "User registered successfully",
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

const loginUser = async (req, res) => {
  try {
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

export { registerUser, loginUser, editUser, deleteUser };
