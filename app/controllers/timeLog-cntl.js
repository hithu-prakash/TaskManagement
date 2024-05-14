
const TimeLog = require ('../models/Time-Log')
const Task = require('../models/task-model')
const {validationResult} = require('express-validator')

const timeCntrl={}

timeCntrl.addTimeLogin = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { taskId, timeSpent } = req.body
    const userId = req.user.id
    try {
        const TimeLog = new TimeLog()({
            task: taskId, 
            user:userId,   
            timeSpent,
        })
        await TimeLog.save()
        res.status(201).json(TimeLog)
    } catch(err) {
        console.error("Error logging time:", err)
        res.status(500).json({ errors: "Failed to log time" })
    }
}

module.exports = timeCntrl