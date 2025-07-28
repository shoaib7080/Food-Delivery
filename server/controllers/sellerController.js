// Login seller : /api/seller/login

import jwt from "jsonwebtoken";
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true, //Prevent JS to access cookie
        secure: process.env.NODE_ENV === "production", //Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
      });
      return res.json({
        success: true,
        message: "Seller logged in successfully",
        user: { email: process.env.SELLER_EMAIL, name: "Seller" },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: "Not Authorisedss" });
  }
};

//Logout seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
