import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'

export default function Register() { 
    
      const navigate = useNavigate()
      const [username,setUsername] = useState('')
      const [email,setEmail] = useState('')
      const [password,setPassword] = useState('')
      const [role,setRole] = useState('')
      const [serverErrors,setServerErrors] = useState(null)
      const [clientErrors,setClientErrors] = useState({})
      const errors = {}
      const runValidations = () =>{
        if(username.trim().length == 0) {
            errors.username = 'username is required'
        }

        if(email.trim().length == 0) {
            errors.email = 'email is required'
        } else if(!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }

        if(password.trim().length == 0) {
            errors.password = 'password is required'
        } else if(password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password should be between 8 - 128 characters'
        }

        if(role.trim().length == 0) {
            errors.role = 'role is required'
        }
      }
      const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            username: username, 
            email: email,
            password: password, 
            role: role 
        }
        runValidations()

        if(Object.keys(errors).length == 0) {
            try {
                const response = await axios.post('http://localhost:5050/user/register', formData) 
                navigate('/login')
                console.log(response.data)
            } catch(err) {
                console.log(err)
                setServerErrors(err.response.data.errors)
            }
        } else {
            setClientErrors(errors)
        }
    }
    
    return (
        <div>
            <h2>SignUp With us</h2>
            { serverErrors && (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                            })}
                        </ul>
                    </div> 
                )}
                <form onSubmit={handleSubmit}>
                <label htmlFor="username">Enter username</label><br />
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    id="username"
                /> 
                { clientErrors.username && <span> { clientErrors.username }</span>}
                
                <br />
                <label htmlFor="email">Enter email</label><br />
                <input 
                    type="text" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    
                    id="email"
                />
                { clientErrors.email && <span> { clientErrors.email }</span>}
                 <br />
                <label htmlFor="password">Enter Password</label><br />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    id="password"
                /> 
                { clientErrors.password && <span> { clientErrors.password }</span>}
                <br />
                <label>Select Role</label> <br /> 
                <input 
                    type="checkbox" 
                    value="user" 
                    onChange={e => setRole(e.target.value)} 
                    checked={role == 'user'}  
                    id="user" 
                    name="role" 
                /> 
                <label htmlFor="user">User</label>
                { clientErrors.role && <span> { clientErrors.role }</span>}
                <br /> 
                <input type="submit" />
            </form>
         
        </div>
    )
}