const nodemailer = require('nodemailer')

//smtp service account for not using real account
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
  },

})

const sendMail = (assignMail) => {
    const mailBody = {
        from : process.env.EMAIL,
        to : assignMail,
        subject: 'Heyyyy! There is a new task for you',
        html:`<p>Hello!!,</p>
                <p>One new task assigned for you, please complete your task in time</p>`
    }


transporter.sendMail(mailBody,( error,info) =>{
    if(error) {
        console.log('something went wrong',error.message)
    } else {
        console.log('Email sent successfully',info.response)
    }
})
}

module.exports = nodemailer
