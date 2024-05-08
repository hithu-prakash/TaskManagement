const User = require('../models/user-model')
const loginvalidationSchema={
    email: {
        exists: {
            errorMessage: 'Email is required'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        isEmail: {
            errorMessage: 'Email should be valid'
        },
        trim:true,
        normalizeEmail:true,
    },
    password: {
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isLength: {
            options: {min :6 , max:20},
            errorMessage:' Password should be between 6 to 20 characters'
        }
    }

}

module.exports = loginvalidationSchema