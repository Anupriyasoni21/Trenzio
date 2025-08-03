const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id).select("-password");


      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

/* const protect = async (req, res, next) => {
  let token;

  console.log("🔹 protect middleware hit");

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔹 Token received:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("🔹 Decoded token:", decoded);

      if (!decoded?.user?.id) {
        console.log("❌ No user.id in decoded token");
        return res.status(401).json({ message: "Token payload invalid" });
      }

      req.user = await User.findById(decoded.user.id).select("-password");
      console.log("🔹 Authenticated user:", req.user);

      if (!req.user) {
        console.log("❌ User not found in DB");
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.log("❌ Token verification failed:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log("❌ No token in headers");
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

const admin = (req, res, next) => {
  console.log("🔹 admin middleware hit, role:", req.user?.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.log("❌ User is not admin");
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
 */

module.exports = { protect, admin };