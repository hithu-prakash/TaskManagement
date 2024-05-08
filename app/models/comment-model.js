const mongoose = require('mongoose')
const {Schema,model} = mongoose

const commentSchema = new Schema({
   text:String,
    taskId:{
        type:Schema.Types.ObjectId,
       
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
 
    postedAt: { 
       type: Date, 
        default: Date.now 
    }
},
{timestamps:true})

const Comment = model('Comment',commentSchema)
module.exports = Comment