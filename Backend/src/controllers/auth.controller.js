import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const generateToken = async (user, res, message) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  return res.status(200).json({
    success: true,
    message,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contact: user.contact,
    },
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, contact } = req.body;
    const user = await userModel.findOne({
      $or: [{ email: email }, { contact: contact }],
    });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const newUser = await userModel.create({
      name,
      email,
      password,
      role,
      contact,
    });

    await generateToken(newUser, res, "user registered successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
