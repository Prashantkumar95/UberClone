const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

// Utility function to extract token from request
const extractToken = (req) => {
  return req.cookies.token || req.headers.authorization?.split(" ")[1];
};

// Utility function to verify token and check blacklist
const verifyToken = async (token, secret) => {
  if (!token) {
    throw new Error("No token provided");
  }

  // Check if token is blacklisted
  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    throw new Error("Token is blacklisted");
  }

  // Verify JWT token
  const decoded = jwt.verify(token, secret);
  return decoded;
};

// Middleware for user authentication
module.exports.authUser = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const decoded = await verifyToken(token, process.env.JWT_SECRET);

    // Find user by ID from decoded token
    const user = await userModel.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

// Middleware for captain authentication
module.exports.authCaptain = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const decoded = await verifyToken(token, process.env.JWT_SECRET);

    // Find captain by ID from decoded token
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      throw new Error("Captain not found");
    }

    // Attach captain to request object
    req.captain = captain;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).json({ message: "Unauthorized User" });
  }
};