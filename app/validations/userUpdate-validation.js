const User = require('../models/user-model')

const userUpdateValidation = {
    username:{
        in: ['body'],
        exists: {
            errorMessage:'Username is required'
        },
        notEmpty: {
            errorMessage:'Username cannot be empty'
        },
        isString: {
            errorMessage:'Username must be String'
        },
        trim:true
    },
    email:{
        in: ['body'],
        exists: {
            errorMessage:'Email is required'
        },
        notEmpty: {
            errorMessage:'Email cannot be empty'
        },
        isEmail: {
            errorMessage:'Email should be valid format'
        },
        trim:true,
        normalizeEmail:true,
        custom :{
            options: async function(val) {
                const user = await User.findOne({email:val})
                if(!user){
                    return true
                } else {
                    throw new Error('email already exist')
                }
            }
        }
    },
    password:{
        in: ['body'],
        exists: {
            errorMessage:'Password is required'
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        isLength: {
            options: {min :6 , max:20},
            errorMessage:' Password should be between 6 to 20 characters'
        }
    },
    
    role:{
        in: ['body'],
        exists: {
            errorMessage:'role is required'
        },
        notEmpty: {
            errorMessage:'role cannot be empty'
        },
        isIn: {
            options: [['user']],
            errorMessage: 'role should selected'
        }, 
        trim: true 
    }
}

module.exports= userUpdateValidation