const Task = require("../models/task.js");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const getAllUsersAndTasks = async (req, res) => {
    try{
        const users = await User.find();
        const usersWithTasks = [];
        for (const user of users) {
          const tasks = await Task.find({ userId: user._id });
          usersWithTasks.push({ user, tasks });
        }
        res.status(200).json({usersWithTasks})
    }catch(err){
        res.status(404).json({
            error: err.message,
        });
    }
};

const createNewUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      isAdmin,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const newTask = async (req, res) => {
    try{
        const { email, title, description, assignedBy } = req.body;
        const user = await User.findOne({email: email})
        const newTask = new Task({
          userId: user._id,
          title,
          description,
          assignedBy,
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }catch(err){
        res.status(404).json({
            error: err.message,
        })
    }
};

const deleteTask = async (req, res) => {
  try{
    const {id} = req.params;
    await Task.findByIdAndRemove(id);
    res.status(204).json({
      message: "Task deleted successfully",
    })

  }catch(err){
    res.status(404).json({
      error: err.message,
    })
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    await Task.deleteMany({userId: id});
    res.status(204).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

module.exports = { getAllUsersAndTasks, createNewUser, newTask, deleteTask, deleteUser };
