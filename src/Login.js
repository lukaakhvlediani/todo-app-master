import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Login = () => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
let navigate = useNavigate();


  const login = async (email,password,) =>{
    
          
            await axios.post(
              "http://localhost:4000/login-user",
              {
                  email,
                  password
                
              }, 
            
            ).then(
                (e)=>{
                    localStorage.setItem("user",JSON.stringify(e.data.data))
                    navigate('Todos')
                }
            );
      }
      
       
  return (
    <div>
    
           <div>
        <input
        type="text"
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
     
         <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
       <button onClick={() =>login(email,password)}>Login</button>
       <button onClick={()=>navigate('Register')}>Register</button>
       
    </div>
    <button onClick={() =>{
        navigate("Weather")
      }}>
        Weather
      </button>
    </div>
  )
}
