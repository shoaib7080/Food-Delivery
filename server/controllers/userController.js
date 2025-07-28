import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Register user api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, //Prevent JS to access cookie
      secure: process.env.NODE_ENV === "production", //Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
    });
    return res.json({
      success: true,
      message: "User created successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Login user api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, //Prevent JS to access cookie
      secure: process.env.NODE_ENV === "production", //Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
    });
    return res.json({
      success: true,
      message: "User logged in successfully",
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("userId from middleware:", userId);
    const user = await User.findById(userId).select("-password");
    console.log("User found:", user);
    return res.json({ success: true, user });
  } catch (error) {
    console.log("isAuth error:", error.message);
    res.json({ success: false, message: "Not Authorised" });
  }
};

//Logout user : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.json({ success: true, message: "logged out" });
  } catch (error) {}
};
