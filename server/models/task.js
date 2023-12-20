const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedBy: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Task", taskSchema);
