import { useState } from "react"
import validator from "validator"
import { Link } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import _ from "lodash"
// import {useAuth} from "../context/AuthContext"

export default function Login() {
    const navigate = useNavigate()
    const [form,setForm] = useState({
        email:"",
        password:"",
        serverErrors:null,
        clientErrors:{}
    })
    const errors = {}
    const runValidation = () => {
        if (form.email.trim().length === 0) {
            errors.email = 'email is required'
        } else if (!validator.isEmail(form.email)) {
            errors.email = 'email should be in a valid format'
        }

        if (form.password.trim().length === 0) {
            errors.password = 'password is required'
        } else if (form.password.trim().length < 6 || form.password.trim().length > 20) {
            errors.password = 'password should be between 6 to 20 characters'
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = _.pick(form, ['email', 'password'])

        runValidation()
        if(Object.keys(errors).length === 0) {
        try {
            const response = await axios.post('http://localhost:5050/user/login', formData)
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
            navigate("/")
        }catch(err){
            setForm({...form,serverErrors:err.response.data.errors,clientErrors:{}})
            console.log(err)
        }
    }else{
        setForm({...form,clientErrors:errors})
    }
    }

    const handleChange = (e) => {
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }
    const displayErrors = () =>{
        let result
        if(typeof form.serverErrors == "string"){
            result = <p>{form.serverErrors}</p>
        }else{
            result = (
                <div>
                    <h3>These errors Prohibited the form from being saved...</h3>
                    <ul>{form.serverErrors.map((ele,i)=>{
                        return <li key={i}>{ele.msg}</li>
                    })}</ul>
                </div>
            )
        }
        return result
    }
    
    return (
        <div>
            <h1>SignIn before you Start</h1>
            {form.serverErrors && displayErrors()}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label><br/>
                <input type="text" onChange={handleChange} name="email" id="email"/>
                {form.clientErrors.email && <span>{form.clientErrors.email}</span>}<br/>
                <label htmlFor="password">Enter Password</label><br/>
                <input type="password" onChange={handleChange} name="password" id="password"/>
                {form.clientErrors.password && <span>{form.clientErrors.password}</span>}<br/>
                <input type="submit"/>
            </form>
            <Link to = "/register">Create Account</Link>
            
        </div>
    )
}
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import _, { result } from 'lodash' //_ is valid character for variable declarations
// import axios from 'axios'
// export default function Login() {
//     const navigate = useNavigate()

//     const [form , setForm] = useState({
//          email:"",
//          password: "",
//          serverErrors:null
//     })

//     const handleSubmit = async(e) =>{
//         e.preventDefault()

//         //const formData = {
//         //     email: form.email,
//         //     password:form.password
//         // }
//         const formData = _.pick(form,['email','password'])
//         //console.log(formData)
//         //client side validations
//         try{
//             const response = await axios.post('http://localhost:5050/user/login', formData)
//             //console.log(response.data)
//             localStorage.setItem('token',response.data.token)
//             navigate('/')
//         } catch(err) {
//             //console.log(err)
//             setForm({...form,serverErrors:err.response.data.errors})
//         }
//     }

//     const handleChange = (e) => {
//         const {value,name} = e.target
//         setForm({...form,[name]:value})
//     }

//     const displayErrors = () =>{
//         let result
//         if(typeof form.serverErrors == "string"){
//             result = <p>{form.serverErrors}</p>
//         }else{
//             result = (
//                 <div>
//                     <h3>These errors Prohibited the form from being saved...</h3>
//                     <ul>{form.serverErrors.map((ele,i)=>{
//                         return <li key={i}>{ele.msg}</li>
//                     })}</ul>
//                 </div>
//             )
//         }
//         return result
//     }
//     return (
//         <div>
//             <h1>SignIn</h1>

//             {form.serverErrors && displayErrors()}
//             <form onSubmit={handleSubmit}>
//             <label htmlFor="email">Enter Email</label> <br />
//                 <input 
//                     type="text" 
//                     value={form.email} 
//                     onChange={handleChange} 
//                     name="email"
//                     id='email'/> <br />
//                  <label htmlFor="password">Enter Password</label> <br />
//                 <input 
//                     type="password" 
//                     value={form.password} 
//                     onChange={handleChange}
//                     id='password'
//                     name="password"/>
//                      <br />

//                 <input type="Submit" />
//             </form>
//         </div>
//     )
// }