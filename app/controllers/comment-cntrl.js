const {validationResult} = require('express-validator')
const Comment = require('../models/comment-model')
const _ = require('lodash')

const commentCntl = {}

commentCntl.create = async(req,res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
        const body=_.pick(req.body,["text"])
      try{
        const comment=new Comment(body)
        comment.taskId=req.user.id
        //comment.taskId=req.params.taskId
        await comment.save()
        res.status(201).json(comment)
      }
      catch(e){
        console.log(e)
        res.status(500).json("invalid errors")
      }
    
    }
commentCntl.show=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const comment =await Comment.findOne({taskId:req.user.id})
        res.status(201).json(comment)
    }
    catch(e){
        console.log(e)
        res.status(500).json("invalid error")
    }
}

commentCntl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    const body=_.pick(req.body,["text"])
    try{
        const comment=await Comment.findOneAndUpdate({taskId:req.user.id},body,{new:true})
        res.status(201).json(comment)
    }
        catch(e){
            res.status(500).json("invalid errors")
        }
   }

   commentCntl.delete=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
       const comment=await Comment.findOneAndDelete({taskId:req.user.id})
       res.status(201).json(comment)
    }
    catch(e){
       console.log(e)
       res.status(500).json("invalid errors")
    }
  }

    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.json({errors:errors.array()})
    // } else {
    //     const body = _.pick(req.body,['text'])
    //     try {
    //         const comment = new Comment(body)
    //         comment.taskId = req.task._id
    //         comment.userId = req.params.userId
    //         await comment.save()
    //         return res.status(201).json(comment)
    //     } catch(err) {
    //         return res.status(500).json(err)
    //     }
    // }

module.exports=commentCntl