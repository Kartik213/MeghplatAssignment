require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth.js");
const taskRoutes = require("./routes/task.js");
const dashboardRoutes = require("./routes/dashboard.js");

const PORT = process.env.PORT || 3000;

const url =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/meghplatAssignment";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res)=>{
  res.send("Ok Ok")
});
app.use("/user", authRoutes);
app.use("/task", taskRoutes);
app.use("/dashboard", dashboardRoutes);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
