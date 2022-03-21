import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './Project.css'

import CustomTextInput from '../Components/CustomTextInput'
import CustomSelect from '../Components/CustomSelect'

import Navbar from './Navbar'


function Project() {
    const navigate = useNavigate();
    const [project, setProject] = useState([])
    const [filtProject, setFiltProject] = useState([])
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [isPressed, setIsPressed] = useState(false)
    
    let sumHours = 0;

    const summing = () => {  
    const results = filtProject.map((row) => {
        return (
          sumHours += row.hours
        )
      })
    }
    
    useEffect(()  => {
        axios.post("http://localhost:3001/project/getprojects", {data: ""}, { headers: {
         accessToken: sessionStorage.getItem("accessToken")
       }}).then((response) => {
           setProject(response.data)
           
           
         }) 
   
       }, [])
  return (
    <>
        <Navbar />
        <div className='project-page'>  
        <Formik
          initialValues={{
            project: "",
            dateFrom: "",
            dateTo: "",
          }}
          validationSchema={
            Yup.object().shape({
            project: Yup.string().required(),
            dateFrom: Yup.string().required(),
            dateTo: Yup.string().required()
          })}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            axios
              .post('http://localhost:3001/project', 
                values,
                {
                  headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                  }
                }
              ).then((res) => {
                    setFiltProject(res.data)
                    console.log(values.dateFrom)
              })
              
              setDateFrom(values.dateFrom)
              setDateTo(values.dateTo)
              
              
              setTimeout(() => {  
                resetForm();
                setSubmitting(false)
                setIsPressed(true)
              }, 2000)
              
              console.log(values)
            
            
          }}
          >
          {props => (
          <Form className="">
            <h1>Project</h1>
            <CustomSelect className="" label="Project" name="project">
              <option value="">Select Project</option>  
              {
                project.map((pages) => {
                  return (
                    <>
                      <option value={pages.name}>{pages.name}</option> 
                    </>
                  )
                  
                })
              }
            </CustomSelect>   
            <CustomTextInput className="" label="From: " name="dateFrom" type="date"/>
            <CustomTextInput className="" label="To: " name="dateTo" type="date"/>
            
            
            

            <button type='submit' className="">{props.isSubmitting ? 'loading...' : 'Submit'}</button>
          </Form>
          )}
        </Formik>

           <div className='filtered-reports-container'>
             <h3>Rapporter</h3>
               {
                   filtProject.map((row) => {
                       return (
                           <ul>
                               <li>{row.date}</li>
                               <li>{row.personName}</li>
                               <li>{row.hours}</li>
                           </ul>
                       )
                   })
               }
               <h3>{isPressed ? filtProject[0].projectName : " "}</h3>
               <h3>{summing()}{isPressed ? sumHours : " "}</h3>
               <h3>{isPressed ? dateFrom + " - " : " "}  {isPressed ? dateTo : " "}</h3>
               
           </div>
        </div>
    </>
  )
}

export default Project