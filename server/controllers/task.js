const Task = require("../models/task.js");

const getTask = async (req, res) => {
    try{
        const user = req.user;
        const userId = user._id;
        const task = await Task.find({ userId: userId });
        res.status(200).json({task});
    }catch(err){
        res.status(401).status({
            error: err.message
        });
    }
};

module.exports = { getTask };
