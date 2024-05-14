
require('dotenv').config()

const cors = require('cors')

const {checkSchema} = require('express-validator')

//validations
const userRegisterValidationSchema = require('./app/validations/user-validation')
const loginvalidationSchema = require('./app/validations/login-validation')
const userUpdateValidation= require('./app/validations/userUpdate-validation')
const TaskValidations = require('./app/validations/task-validation')
const taskUpdateValidation=require('./app/validations/task-update-validation')
//comment validations
const commentValidation = require('./app/validations/comment-validation')
//timeLog
//const {timeLogValidations,timeLogUpdateValidations} = require('./app/validations/timeLog-validation')

//db
const configureDB = require('./config/db')
const express = require('express')


//controllers
const userCntl = require('./app/controllers/user-cntrl')
const taskCntl = require('./app/controllers/task-cntrl')
//comments
const commentCntl = require('./app/controllers/comment-cntrl')
//timeLog
const timeCntrl=require('./app/controllers/timeLog-cntl')

//middleware
const authenticateUser=require('./app/middlewares/authenticateUser')
const authorizeUser=require('./app/middlewares/authorizeUser')

const app = express()
const port = process.env.PORT

configureDB()

app.use(express.json())
app.use(cors())

//route
app.post('/user/register',checkSchema(userRegisterValidationSchema), userCntl.register)
app.post('/user/login',checkSchema(loginvalidationSchema),userCntl.login)

//middleware
app.get('/user/account', authenticateUser, userCntl.account)
app.put('/user/update',authenticateUser,checkSchema(userUpdateValidation),userCntl.update)
app.delete('/user/delete',authenticateUser,userCntl.delete)

//task
app.post('/task/create',authenticateUser,checkSchema(TaskValidations),taskCntl.create)
app.get('/task',authenticateUser,taskCntl.show)
app.put('/task/update',authenticateUser,checkSchema(taskUpdateValidation),taskCntl.update)
app.delete('/task/delete/:id',authenticateUser,taskCntl.delete)
app.get("/tasks/allTasks",taskCntl.alltask)


//comment
app.post('/comment/create',authenticateUser,authorizeUser(['user']),checkSchema(commentValidation),commentCntl.create)
app.get('/comment',authenticateUser,authorizeUser(['user']),commentCntl.show)
app.put('/comment/update',authenticateUser,authorizeUser(['user']),commentCntl.update)
app.delete('/comment/delete',authenticateUser,authorizeUser(['user']),commentCntl.delete)


//gmail
app.post('/sendemail',authenticateUser,taskCntl.Gmail)

//timeLog
app.post('/time/create',authenticateUser,timeCntrl.addTimeLog)

app.listen(port,() => {
    console.log('port running sucessfully',port)
})