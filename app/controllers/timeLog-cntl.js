const  TimeLog= require('../models/TimeLog-model')
const Task = require('../models/task-model')
const {validationResult} = require('express-validator')

const timeCntrl={}

timeCntrl.addTimeLog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { taskId, timeSpent } = req.body;
    const userId = req.user.id;
  
    try {
  
      const newTimeLog = new TimeLog({
        task: taskId, 
        user:userId,   
        timeSpent,
        
      });
      console.log(newTimeLog)
      await newTimeLog.save();
     // console.log(newTimeLog)
      res.status(201).json(newTimeLog);
    } catch (err) {
      console.log("Error logging time:", err);
      res.status(500).json({ errors: "Failed to log time" });
    }
  };
  
module.exports = timeCntrl