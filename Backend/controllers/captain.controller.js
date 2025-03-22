const BlacklistToken = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

// Utility function to handle token extraction
const extractToken = (req) => {
  return req.cookies.token || req.headers.authorization?.split(' ')[1];
};

// Register a new captain
module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  // Validate vehicle object
  if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
    return res.status(400).json({ errors: [{ msg: "All vehicle fields are required" }] });
  }

  try {
    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ errors: [{ msg: "Captain already exists" }] });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create a new captain
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // Generate JWT token
    const token = captain.generateAuthToken();

    // Set token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Return response
    res.status(201).json({ captain, token });
  } catch (error) {
    console.error('Error in registerCaptain:', error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// Login captain
module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find captain by email and include password in the result
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    // Verify password
    const isPasswordValid = await captain.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    // Generate JWT token
    const token = captain.generateAuthToken();

    // Set token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Return response
    res.status(200).json({ captain, token });
  } catch (error) {
    console.error('Error in loginCaptain:', error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// Get captain profile
module.exports.getCaptainProfile = async (req, res) => {
  try {
    // Return captain profile from request object
    res.status(200).json(req.captain);
  } catch (error) {
    console.error('Error in getCaptainProfile:', error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

// Logout captain
module.exports.logoutCaptain = async (req, res) => {
  try {
    // Extract token from request
    const token = extractToken(req);

    // Blacklist the token
    await BlacklistToken.create({ token });

    // Clear the token cookie
    res.clearCookie('token');

    // Return success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error('Error in logoutCaptain:', error.message);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};