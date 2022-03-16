import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Formik, Form} from 'formik'
import axios from 'axios'


//PAge
import CustomSelect from '../Components/CustomSelect'



function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    
  const login = () => {
    const data = {username: username, password: password}
      axios.post("http://localhost:3001/auth/login", data,
      {headers: { accessToken: sessionStorage.getItem("accessToken") }}).then(
          (response) => {
            console.log(response.data)
              if (response.data.error) {
                 alert(response.data.error)
              } else {
                sessionStorage.setItem("accessToken", response.data );
                navigate("/home");  
              }
              
          }
      )
        
  }
  return (
    <div>
        <input 
          type="text"
          onChange={(event) => {
              setUsername(event.target.value)
          }} 
        />
        <input 
          type="password"
          onChange={(event) => {
              setPassword(event.target.value)
          }} 
        />

        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login