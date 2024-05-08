const Task = require('../models/task-model')

const taskValidation=({
  title:{
      // isIn:{
      //    options:[["body"]]},
      notEmpty:{
          errorMessage:"not empty"
      },
      exists:{
          errorMessage:"title is required"
      },
      custom:{
        options:async(value)=>{
          const title=await Task.findOne({title:value})
          try{
            if(title){
              throw new Error(" this title is already given")
            }
            return true
          }
          catch(e){
              console.log(e.message)
          }
        }
      }
  },
  
  description:{
      // isIn:{
      //     options:[["body"]]},
      notEmpty:{
          errorMessage:"not empty"
      },
      exists:{
          errorMessage:"description is required"
      }

  },
  status:{
      isIn:{
          options:[["body"]]},
      isIn:{
          options:[["completed","pending","inProgress"]],
          errorMessage:"status must be pending or completed or incompleted"

  },
  exists:{
      errorMessage:"status is required"
  }},

  priority:{
      isIn:{
          options:[["body"]]},
      isIn:{
          options:[["low","high","medium"]],
          errorMessage:"should be give priority wise"
      }
  },
  dueDate:{
  custom: {
      options:(value)=> {
          if(new Date(value)<new Date()) {
              throw new Error('Due Date must be needed')
          }
          return true
      }
  },}

  

})

module.exports= taskValidation


