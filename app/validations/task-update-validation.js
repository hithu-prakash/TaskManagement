const Task = require('../models/task-model')
const taskUpdateValidation=({
    title:{
        // isIn:{
        //     options:[["body"]]},
        notEmpty:{
            errorMessage:"not empty"
        },
        exists:{
            errorMessage:"title is required"
        },
    trim:true},
  
    description:{
        // isIn:{
        //     options:[["body"]]},
        notEmpty:{
            errorMessage:"not empty"
        },
        exists:{
            errorMessage:"description is required"
        },
        trim:true
  
    },
    status:{
        isIn:{
            options:[["body"]]},
        isIn:{
            options:[["completed","pending","inProgress"]],
            errorMessage:"status must be pending or completed or incompleted"
  
    },
    trim:true,
    exists:{
        errorMessage:"status is required"
    }},
    priority:{
        isIn:{
            options:[["body"]]},
        isIn:{
            options:[["low","high","medium"]],
            errorMessage:"should be give priority wise"
        },
        trim:true
    },
    dueDate:{
        notEmpty:{
            errorMessage:"not empty"
        }
    }
  })
  
  module.exports= taskUpdateValidation
  