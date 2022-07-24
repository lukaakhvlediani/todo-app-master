import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repeatPass,setRepeatPass] = useState('')

  let navigate = useNavigate();

    const register = async (userName,email,password,repeatPassword) =>{
        if(password === repeatPassword) {
            console.log(userName,email,password,repeatPassword)
              await axios.post(
                "http://localhost:4000/register-user",
                {
                    userName,
                    email,
                    password
                  
                }, 
              
              ).then(
                  ()=>navigate('/')
              );
        }
        
        }  
  return (
    <div>
         
        <input
        type="text"
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="text"
            placeholder='username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
         />
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <input 
         type="password"
         placeholder="repeat password"
         value={repeatPass}
         onChange={(e) => setRepeatPass(e.target.value)}

        />
      
       <button onClick={() => register(userName,email,password,repeatPass)}>Register</button>
       <button onClick={() =>navigate('/')}>go back</button>
    </div>
  )
}
