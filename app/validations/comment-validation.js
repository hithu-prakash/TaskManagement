const Comment=require("../models/comment-model")


const commentValidation=({
    text:{
        notEmpty:"text should not be empty"
    }
    ,
    exists:{
        errorMessage:"text is required"
    }
})

module.exports=commentValidation