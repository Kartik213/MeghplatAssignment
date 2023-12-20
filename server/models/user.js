const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
