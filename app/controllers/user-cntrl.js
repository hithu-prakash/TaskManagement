const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')


const userCntl={}

userCntl.register = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    } 
    const body= req.body
    try {
        //const user = await User.create(body)
        const salt = await bcryptjs.genSalt()   //genSalt for hashUnique
        const hashPassword = await bcryptjs.hash(body.password, salt) // 2 parameter string and salt
        const user = new User(body)
        user.password= hashPassword
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        res.status(500).json({errors:'something went wrong'})
    }
} 

userCntl.login = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    } 
    const body= req.body
    try {
    //checking db existing or not
    const user = await User.findOne({email:body.email})
    if(user) {
        const isAuth = await bcryptjs.compare(body.password,user.password)
        if(isAuth) {
            //return res.json(user)
            const tokenData= {
                id: user._id,
                role: user.role
            }
            const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'7d'})
            return res.json({token:token})
        }
        return res.status(404).json({errors:'invaild email/password'})
    }
    res.status(404).json({errors : 'invaild email/password'})
    } catch(err) {
        res.status(500).json({errors:'something went wrong'})
    }

}

userCntl.account = async(req,res) => {
    try {
        const user = await User.findById(req.user.id)
        return res.json(user)
    } catch (err) {
        return res.status(500).json({ errors: 'Something went wrong' })
    }

}

userCntl.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const user = await User.findByIdAndUpdate(req.user.id, body, { new: true })
        return res.json(user)
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

userCntl.delete = async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findByIdAndDelete(req.user.id)
        return res.json(user)
    }catch(err){
        res.status(500).json({ errors: 'Something went wrong' })
    }

}
  

module.exports=userCntl