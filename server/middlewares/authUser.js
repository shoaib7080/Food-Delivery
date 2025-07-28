import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  console.log("All cookies:", req.cookies);
  const { token } = req.cookies;

  if (!token) {
    console.log("No token found");
    return res.json({ success: false, message: "Not Authorised" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Not Authorised" });
    }
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res.json({ success: false, message: "Not Authorised" });
  }
};
export default authUser;
