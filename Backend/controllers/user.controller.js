const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/blacklistToken.model");

// Utility function to handle token extraction
const extractToken = (req) => {
  return req.cookies.token || req.headers.authorization?.split(" ")[1];
};

// Register a new user
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    // Check if user already exists
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create a new user
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = user.generateAuthToken();

    // Set token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    // Return response
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// Login user
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email and include password in the result
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Set token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    // Return response
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// Get user profile
module.exports.getUserprofile = async (req, res, next) => {
  try {
    // Return user profile from request object
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in getUserprofile:", error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// Logout user
module.exports.logoutUser = async (req, res, next) => {
  try {
    // Extract token from request
    const token = extractToken(req);

    // Blacklist the token
    await blacklistToken.create({ token });

    // Clear the token cookie
    res.clearCookie("token");

    // Return success response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logoutUser:", error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};