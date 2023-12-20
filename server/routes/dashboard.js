const express = require("express");
const { getAllUsersAndTasks, createNewUser, newTask, deleteTask, deleteUser } = require("../controllers/dashboard.js");
const { isAuthorized } = require("../authMiddleware.js")

const router = express.Router();

router.get("/", isAuthorized, getAllUsersAndTasks);
router.post("/createUser", isAuthorized, createNewUser);
router.post("/newTask", isAuthorized, newTask);
router.delete("/deleteTask/:id", isAuthorized, deleteTask);
router.delete("/deleteUser/:id", isAuthorized, deleteUser);

module.exports = router;
