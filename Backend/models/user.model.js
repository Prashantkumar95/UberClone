const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new Schema({
  fullname: {
    firstname: {  // Corrected the typo here
      type: String,
      required: true,
      minlength: [3, 'First name should be of at least three characters'],
      maxlength: 50
    },
    lastname: {  // Corrected the typo here
      type: String,
      required: true,
      minlength: [3, 'Last name should be of at least three characters'],
      maxlength: 50
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Email should be of at least three characters'],
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    select: false // Don't select password by default
  },
  socketId: {
    type: String,
  }
});

// Method to generate an authentication token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Method to compare plain password with hashed password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to hash password
userSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword;
};

// Create the model
const userModel = model("User", userSchema);

module.exports = userModel;
