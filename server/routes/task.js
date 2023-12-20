const express = require("express");
const { getTask } = require("../controllers/task.js");
const { protect } = require("../authMiddleware.js")

const router = express.Router();

router.get("/", protect, getTask);

module.exports = router;
