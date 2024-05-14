import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function AddTask(){
    const navigate=useNavigate()
    const {user,dispatch}=useAuth()
    const [form,setForm]=useState({
        task:'',
        status:'',
        priority:"",
        dueDate:'',
        description:'',
        clientErrors:{},
        serverErrors:null
    })
    const errors = {}

    const runValidations = () => {
        
        if(form.task.trim().length == 0) {
            errors.task = 'task is required'
        }

        if(form.priority.trim().length == 0) {
            errors.description = 'task is required'
        }

        if(form.description.trim().length == 0) {
            errors.priority = 'task is required'
        }

        if(form.dueDate.trim().length == 0) {
            errors.dueDate = 'date is required'
         } 
        //else if(new Date(e.target.value)>new Date()) {
        //     errors.dueDate = 'Date should be Greater then today'
        // }

        if(form.status.trim().length == 0) {
            errors.status = 'status is required'
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        runValidations()

        const formData = {
            task: form.task, 
            description: form.description,
            status: form.status, 
            priority: form.priority,
            dueDate:form.dueDate 
        }
        
        

        if(Object.keys(errors).length == 0) {
            try {
                const response = await axios.post('http://localhost:5050/task/create',formData,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                  })
                // dispatch({type:'TASK',payload:response.data})
                navigate('/account')
            } catch(err) {
                setForm({...form,serverErrors:err.response.data.errors})
            }
        } else {
            setForm({...form,clientErrors:errors})
        }
    }

    const displayErrors = () => {
        let result 
        if(typeof form.serverErrors == 'string') {
            result = <p> { form.serverErrors } </p>
        } else {
            result = (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { form.serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div>
            )
        }
        return result 
    }
    
    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="task">Enter task</label><br />
                <input 
                    type="text" 
                    value={form.task} 
                    onChange={handleChange} 
                    id="task"
                    name="task"
                /> 
                { form.clientErrors.task && <span> { form.clientErrors.task }</span>}
        
                <br />

                <label htmlFor="des">Enter description</label><br />
                <input 
                    type="textarea" 
                    value={form.description} 
                    onChange={handleChange} 
                    id="des"
                    name="description"
                /> 
                { form.clientErrors.description && <span> { form.clientErrors.description }</span>}
        
                <br />
                <label htmlFor="date">Enter DueDate</label><br />
                <input 
                    type="date" 
                    value={form.date} 
                    onChange={handleChange} 
                    id="date"
                    name="dueDate"
                /> 
                { form.clientErrors.dueDate && <span> { form.clientErrors.dueDate }</span>}
        
                <br />
                <label>Select Status</label><br/>
                <input 
                    type="radio" 
                    value="pending" 
                    onChange={handleChange} 
                    checked={form.status == 'pending'}  
                    id="pending" 
                    name="status" 
                />
                <label htmlFor="status">pending</label>
                <input 
                    type="radio" 
                    value="completed" 
                    onChange={handleChange} 
                    checked={form.status == 'completed'}  
                    id="completed" 
                    name="status" 
                />
                <label htmlFor="completed">completed</label>
                <br/>
                <label>Select Priority</label><br/>
                <input 
                    type="radio" 
                    value='high' 
                    onChange={handleChange} 
                    id="high"
                    checked={form.priority=='high'}
                    name="priority"
                /> 
                 <label htmlFor="high">High</label>
                 <input 
                    type="radio" 
                    value='medium' 
                    onChange={handleChange} 
                    id="mid"
                    checked={form.priority=='medium'}
                    name="priority"
                /> 
                 <label htmlFor="mid">Medium</label> <input 
                    type="radio" 
                    value='low'
                    onChange={handleChange} 
                    id="low"
                    checked={form.priority=='low'}
                    name="priority"
                /> 
                 <label htmlFor="low">low</label>

                { form.clientErrors.priority && <span> { form.clientErrors.priority }</span>}
                <br />
                <input type="submit"/>
            </form>
            { form.serverErrors && displayErrors() } 

        </div>
    )
}