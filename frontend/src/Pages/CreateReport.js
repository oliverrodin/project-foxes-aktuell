import {React, useEffect, useState}from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'
import axios from "axios";

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
    useEffect(()  => {
     axios.post("http://localhost:3001/getdatabase/project").then((response) => {
        setProject(response.data)
        
      }) 

      axios.post("http://localhost:3001/getdatabase/people").then((response) => {
        setPerson(response.data)
        
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
    
    const onSubmit = (data) => {

        fetch('http://localhost:3001/createtimereports',{
        method: 'POST',
        url: 'https://api.notion.com/v1/pages',
        body: (
          JSON.stringify(data)),
        headers: { "Content-Type": 'application/json' }
      }) 
      
       console.log(JSON.stringify(data))
      
    };

  return (
    <div className='createReportPage'>
      <Formik
        initialValues={{
          person: "",
          project: "",
          date: "",
          hours: "",
          note:"",
          comment:""
        }}
        validationSchema={
          Yup.object().shape({
          person: Yup.string().required(),
          project: Yup.string().required(),
          date: Yup.date().required(),
          hours:Yup.number().required(),
          note: Yup.string().required(),
          comment: Yup.string().required()
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          fetch('http://localhost:3001/createtimereports',{
            method: 'POST',
            url: 'https://api.notion.com/v1/pages',
            body: (
              JSON.stringify(values)),
            headers: { "Content-Type": 'application/json' }
          }) 

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resetForm();
            setSubmitting(false)
          }, 2000)
        }}
        >
        {props => (
        <Form className="container">
          <h1>Create time report</h1>
          <CustomSelect label="Person" name="person">
            <option value="">Select Person</option>
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
          <CustomSelect label="Project" name="project">
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
          <CustomTextInput label="Date" name="date" type="date"/>
          <CustomTextInput label="Hours" name="hours" type="number" placeholder='ex. 10...'/>
          <CustomTextInput label="Note" name="note" type="text" placeholder='ex. meeting...'/>
          <CustomTextInput label="Comment" name="comment" type="text" placeholder='ex. fixed this bug...'/>
          <label className="input">Comment:</label>
          

          <button type='submit' className="button">{props.isSubmitting ? 'loading...' : 'Submit'}</button>
        </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateReport;
