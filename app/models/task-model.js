const mongoose=require("mongoose")
const {Schema,model}=mongoose
const User= require("../models/user-model")


const taskSchema=new Schema ({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    description:String,
    priority:String,
    dueDate:Date,
    status:String,
    comment:[{
        type:Schema.Types.ObjectId,
        ref:"comment"
    }]


})

const Task=model("Task",taskSchema)
module.exports=Task