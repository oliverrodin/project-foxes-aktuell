import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Formik, Form} from 'formik'
import axios from 'axios'
import "./Login.css";
import {Link} from 'react-router-dom'



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
<<<<<<< HEAD
         <Formik initialValues={{id: ""}} onSubmit={onSubmit}>
                {props=>(
                    <Form>
                    <CustomSelect name="id">
                         <option value="">Select person</option>
                            {
                                person.map((pages) => {
                                    return (
                                    <>
                                        <option value={pages.id}>{pages.name}</option> 
                                    </>
                                    )
                                    
                                })
                            } 
                    </CustomSelect>
                        <button type="submit">Välj Person</button>
                    </Form>
                )}
            </Formik>
=======
        <div className="login-div">
        <div className="logo"></div>
        
        <div className="title">Foxes Timereports</div>
        <div className="sub-title">2022</div>
        <div className="fields">
            <div className="username"><input 
          type="text" placeholder="Username"
          onChange={(event) => {
              setUsername(event.target.value)
          }} 
        /></div>
            <div className="password"><input 
          type="password" placeholder="Password"
          onChange={(event) => {
              setPassword(event.target.value)
          }}  /></div>
        </div>
        <button className="signin-button" onClick={login}>Login</button>
        <div className="link">
        <Link to="/registration">Sign up</Link>
        </div>
        </div>
>>>>>>> 212a31e1d33d3f12d32bcfa408d776ef663e1585
    </div>
  )
}

export default Login