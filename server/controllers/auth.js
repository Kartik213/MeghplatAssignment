const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      isAdmin: true,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "User does not exists." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const jwtSecret = process.env.JWT_SECRET || "somethingveryhardtoguess";
    const token = jwt.sign({ id: user._id }, jwtSecret);
    delete user.password;
    res.status(200).json({ token, user });
  }
  catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { registerAdmin, login };
