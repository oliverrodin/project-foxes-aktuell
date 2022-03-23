import {React, useContext, useEffect, useState}from "react";
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { LoginContext } from "../Context/LoginContext";
import './CreateReport.css'
import Navbar from './Navbar'

const database_id = '58d96ae9275547a7960f5cca7c93e836'

const CustomTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field}{...props} />
      {meta.touch && meta.error ? (
        <div className="error">{meta.error}</div> ) : null}
    </>
  )
}

const CustomCheckbox = ({children, ...props}) => {
  const [field, meta] = useField(props, 'checkbox')

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field}{...props} />
        {children}
      </label>
      {meta.touch && meta.error ? (
        <div className="error">{meta.error}</div> ) : null}
    </>
  )
}

const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field}{...props} />
      {meta.touch && meta.error ? (
        <div className="error">{meta.error}</div> ) : null}
    </>
  )
}


function CreateReport() {
    const [project, setProject] = useState([])
    const [person, setPerson] = useState([])
    const { name, loginId } = useContext(LoginContext)
    const navigate = useNavigate();

    useEffect(()  => {
     axios.post("http://localhost:3001/getdatabase/project", {data: ""}, { headers: {
      accessToken: sessionStorage.getItem("accessToken")
    }}).then((response) => {
        setProject(response.data)
        
      }) 

    }, [])

    console.log(project)

    /* const Projects = () => {
      return(
        <>
          <options></option>
        </>
      )
    } */
    
    // const onSubmit = (data) => {

    //     fetch('http://localhost:3001/createtimereports',{
    //     method: 'POST',
    //     url: 'https://api.notion.com/v1/pages',
    //     body: (
    //       JSON.stringify(data)),
    //     headers: { "Content-Type": 'application/json',
    //                 accessToken: sessionStorage.getItem("accessToken")}
    //   }) 
      
    //    console.log(JSON.stringify(data))
      
    // };

  return (
    <>
    <Navbar />
      
        <Formik
          initialValues={{
            
            project: "",
            date: "",
            hours: "",
            note:"",
            comment:""
          }}
          validationSchema={
            Yup.object().shape({
            project: Yup.string().required(),
            date: Yup.date().required(),
            hours:Yup.number().required(),
            note: Yup.string().required(),
            comment: Yup.string().required()
          })}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            axios
              .post('http://localhost:3001/createtimereports', 
                values,
                {
                  headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                  }
                }
              )
              
              setTimeout(() => {
                navigate("/home")
                resetForm();
                setSubmitting(false)
              }, 2000)
              
              
            // fetch('http://localhost:3001/createtimereports',{
            //   method: 'POST',
            //   url: 'https://api.notion.com/v1/pages',
            //   body: (
            //     JSON.stringify(values)),
            //   headers: { "Content-Type": 'application/json'}
            // }) 

            
          }}
          >
          {props => (
          <Form className="container">
            <h1>Create time report</h1>
            <CustomSelect className="timeReportInput" label="Project" name="project">
              <option value="">Select Project</option>  
              {
                project.map((pages) => {
                  return (
                    <>
                      <option value={pages.id}>{pages.name}</option> 
                    </>
                  )
                  
                })
              }
            </CustomSelect>   
            <CustomTextInput className="timeReportInput" label="Date" name="date" type="date"/>
            <CustomTextInput className="timeReportInput" label="Hours" name="hours" type="number" placeholder='ex. 10...'/>
            <CustomTextInput className="timeReportInput" label="Note" name="note" type="text" placeholder='ex. meeting...'/>
            <CustomTextInput className="timeReportInput" label="Comment" name="comment" type="text" placeholder='ex. fixed this bug...'/>
            
            

            <button type='submit' className="btnPos">{props.isSubmitting ? 'loading...' : 'Submit'}</button>
          </Form>
          )}
        </Formik>
      
    </>
  );
}


export default CreateReport;
