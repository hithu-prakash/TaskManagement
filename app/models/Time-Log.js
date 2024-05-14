const mongoose = require('mongoose')
const { Schema, model } = mongoose

const timeLogSchema = new Schema({
    task: { 
            type: Schema.Types.ObjectId,
            ref: 'Task', 
            required: true
         },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    timeSpent: { 
        type: Number, 
        required: true
    }, // Time spent in minutes
    loggedAt: { 
        type: Date, 
        
        default: Date.now }
}, { timestamps: true }) 

const TimeLog = model('TimeLog', timeLogSchema)

module.exports = TimeLog