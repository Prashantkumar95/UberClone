const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String, // Fixed typo 'typeo' to 'type'
      required: true,
      minlength: [3, "First name must be 3 characters long"], // Fixed typo 'minilength' to 'minlength'
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be 3 characters long"], // Fixed typo 'minilength' to 'minlength'
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid Email"],
  },
  password: {
    type: String,
    required: true,
    select: false, // Password will not be included in queries by default
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be 3 characters long"], // Fixed typo 'minilength' to 'minlength'
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be 3 characters long"], // Fixed typo 'minilength' to 'minlength'
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be greater than 0"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
});

// Method to generate an authentication token
captainSchema.methods.generateAuthToken = function () {
  const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};

// Method to compare password
captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to hash passwords
captainSchema.statics.hashPassword = async function (password) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

const captainModel = mongoose.model("Captain", captainSchema); // Changed 'captain' to 'Captain' for consistency

module.exports = captainModel;
