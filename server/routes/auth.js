const express = require("express");
const { login, registerAdmin } = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", login);
router.post("/registerAdmin", registerAdmin);

module.exports = router;
