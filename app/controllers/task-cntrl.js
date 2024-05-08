const Task = require('../models/task-model')
const User = require('../models/user-model')

const nodemailer = require('../mail/nodemailer')

const {validationResult}= require('express-validator')

const taskCntl={}

taskCntl.alltask = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json(400)({errors:errors.array()})
    }
     const body=req.body
    try{
        const task=await Task.find({}) 
        res.json(task)
    }
    catch(e){
        res.status(500).json("internal error")
    }
}


taskCntl.create=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    try{
        const body=req.body
        const task=new Task(body)
        task.userId=req.user.id
        await task.save()
        res.status(201).json(task)
    }catch(err){
        res.status(500).json({errors:err})
    }
}

taskCntl.show=async(req,res)=>{
    try{
        const task=await Task.findOne({userId:req.user.id})
        res.status(201).json(task)
    }
    catch(err){
        res.json({errors:err})
    }
}

taskCntl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    try{
        const body=req.body
        const task=await Task.findOneAndUpdate({userId:req.user.id},body,{new:true})
        console.log(task)
        res.json(task)

       }catch(err){
           res.json(err)
     }
}


taskCntl.delete=async (req,res)=>{
    try{
        const id=req.params.id
        const body=req.body
        const task =await Task.findByIdAndDelete(id,body,{new:true})
        res.json(task)
    }catch(err){
        res.json(err)
    }
}



taskCntl.Gmail=async(req,res)=>{
    try{
           const mail={
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
                 }
           }
           const transporter=nodemailer.createTransport(mail)
           let email={
            from:process.env.EMAIL,
            to:'chiraghalyal@gmail.com',
            subject:'',
            html:"<b>heyy!! Buddy</b>"
           }

           const e=await transporter.sendMail(email)
           res.json('mail sent successfully!!')
    }catch(err){
        res.json(err)
    }
}



/*taskCntl.create =  async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.json(400).json({errors:errors.array()})
    }
    try {
        const body = req.body
        const task = new Task(body)
        task.userId= req.user.id
        await task.save()
        //mail part
        const assignUser = await User.findById(task.assignUserId)
        if(!assignUser) {
            return res.status(400).json({error:'Assigned user not found'})
        } else {
            nodemailer.sendTaskEmail(assignUser.email)
        } 
        res.status(200).json()
    } catch(err) {
        console.log(err) 
        res.status(500).json({ errors: 'something went wrong'})
    }

} */

module.exports = taskCntl