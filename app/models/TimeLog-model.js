const mongoose = require('mongoose')
const { Schema, model } = mongoose

const timeLogSchema = new Schema({
    task: { 
        type: Schema.Types.ObjectId, 
        ref: 'Task'
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
     },
    timeSpent: { type: Number}, // Time spent in minutes
    loggedAt: { type: Date, default: Date.now }
}, { timestamps: true }) // Timestamps to know what time this was logged

const TimeLog = model('TimeLog', timeLogSchema)

module.exports = TimeLog