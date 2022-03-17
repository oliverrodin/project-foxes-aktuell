import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'

//Pages
import CustomTextInput from '../Components/CustomTextInput'
import axios from 'axios';

function Registration() {
  const navigate = useNavigate();
  return (
    <>
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
              <CustomTextInput label="Name:" name="name" type="text" />
              <CustomTextInput label="Email: " name="email" type="email" />
              <CustomTextInput label="Username: " name="username" type="text" />
              <CustomTextInput label="Password: " name="password" type="password" /> 
              <button type='submit' className="button">{props.isSubmitting ? 'loading...' : 'Register'}</button>
            </Form>

          )}  
          
      </Formik>
    </>
  )
}

export default Registration