import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'
import './Registration.css';
import {Link} from 'react-router-dom'

//Pages
import CustomTextInput from '../Components/CustomTextInput'
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  return (
    <>
    <div className='registration-div'>
    <div className="logo"></div>
        
        <div className="title">Foxes Timereports</div>
        <div className="sub-title">2022</div>
        <div className="fields">
      <Formik
      initialValues={{
          name: "",
          email: "",
          username: "",
          password: "",
          


      }}
      validationSchema={Yup.object().shape({
          username: Yup.string().min(3).max(15).required(),
          password: Yup.string().min(4).max(20).required(),
          email: Yup.string().required(),
          name: Yup.string().required()

      })}
      onSubmit={ (values, {setSubmitting, resetForm}) => {
        axios.post('http://localhost:3001/auth', values)
             .then((res) => {
               console.log(res)
             })
        
        
        resetForm();
        setSubmitting(false)
        navigate('/')     
      }}
        >
          
          {props => (
            <Form>
              <CustomTextInput className="username" placeholder="Name" input type="text" name="name"  />
              <CustomTextInput className="username" placeholder="Email " name="email" type="email" />
              <CustomTextInput className="username" placeholder="Username " name="username" type="text" />
              <CustomTextInput className="username" placeholder="Password" name="password" type="password" /> 
              <button type='submit' className="registration-button">{props.isSubmitting ? 'loading...' : 'Register'}</button>
              <div className="link">
        <Link to="/">Back to Login</Link>
        </div>
            </Form>

          )}  
          
      </Formik>
      </div>
      </div>
    </>
  )
}

export default Registration