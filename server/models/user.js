const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can not be emplty"],
  },
  email: {
    type: String,
    required: [true, "Email can not be empty"],
    max: 200,
    unique: [true, "Email already exist"],
    match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password can not be empty"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
