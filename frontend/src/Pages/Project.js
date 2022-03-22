import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './Project.css'

import CustomTextInput from '../Components/CustomTextInput'
import CustomSelect from '../Components/CustomSelect'

import Navbar from './Navbar'


function Project() {
    const navigate = useNavigate();
    const [person, setPerson] = useState([])
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
         axios.post("http://localhost:3001/project/people", {data: ""}, { headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }}).then((response) => {
            setPerson(response.data)
            
            
          }) 

       }, [])
  return (
    <>
        <Navbar />
        <div className='project-page'>  
        <Formik
          initialValues={{
            person: "",
            project: "",
            dateFrom: "",
            dateTo: "",
          }}
          validationSchema={
            Yup.object().shape({
            person: Yup.string().required(),
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
            <h1>{isPressed ? "Projekt: " + filtProject[0].projectName : " "}</h1>
            <h3>{isPressed ? " " : "Välj projekt och tidspan för att se mer information"}</h3>
            
            <CustomSelect className="" label="Medarbetare" name="person">
              <option value="">Välj person</option>  
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

            <CustomSelect className="" label="Projekt" name="project">
              <option value="">Välj projekt</option>  
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
            <CustomTextInput className="" label="Från: " name="dateFrom" type="date"/>
            <CustomTextInput className="" label="Till: " name="dateTo" type="date"/>
            
            
            

            <button type='submit' className="">{props.isSubmitting ? 'loading...' : 'Submit'}</button>
          </Form>
          )}
        </Formik>

           <div className='filtered-reports-container'>
             
             
               {
                   filtProject.map((row) => {
                       return (
                           <ul>
                               <li>{"Datum: " + row.date}</li>
                               <li>{"Namn: " + row.personName}</li>
                               <li>{"Timmar: " + row.hours}</li>
                           </ul>
                       )
                   })
               }
               
               <h3>{summing()}{isPressed ? "Totalt " + sumHours + " timmar" : " " }</h3>
               <h3>{isPressed ?  "Vald period: " + dateFrom  + " - " : " "}  {isPressed ? dateTo : " "}</h3>
               
           </div>

        </div>
    </>
  )
}

export default Project