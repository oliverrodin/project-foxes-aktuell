import React, { useState, useEffect, useContext } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import "./Report.css";
import { LoginContext } from '../Context/LoginContext'
import "./Modal.css"; 
import CustomSelect from "../Components/CustomSelect";
import CustomTextInput from "../Components/CustomTextInput"
import Navbar from './Navbar'
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'
import Footer from "./Footer";
import Spinner from "../Components/Spinner";

function Home() {
  const [reports, setReports] = useState([]);
  const [project, setProject] = useState([]);
  const [popupcontent, setpopupcontent] = useState([]);
  const [popuptoggle, setpopuptoggle] = useState(false);
  const [popuptoggle2, setpopuptoggle2] = useState(false);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  
  const changeContent=(value)=>{
    setpopupcontent([value]);
    setpopuptoggle(!popuptoggle);
  };


  const changeContent2=()=>{
    setpopuptoggle2(!popuptoggle2)
  }

  function refreshPage() {
    window.location.reload(false);
  }
  
  
  useEffect(() => {
    axios
      .post("http://localhost:3001/getdatabase/report", {data: ""}, { headers: {accessToken: sessionStorage.getItem("accessToken")} } )
      .then((response) => {
        setReports(response.data);
        setIsLoadingProjects(false)
        
      });

    axios
      .post("http://localhost:3001/getdatabase/activeproject", {data: ""}, { headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }})
      .then((response) => {
        setProject(response.data)
        setIsLoadingReports(false)
      })
      
    

  }, []);

  return (
    <>
    <Navbar />
    

      <div className="home-page">
        <div className="project-container">
          
          <h2>Mina projekt <Link to="/project" className="link">
              <i class="fa-solid fa-plus" ></i>
            </Link></h2>
          
            <table className="table-container-home">
             { isLoadingProjects && <Spinner/>}
              <thead className="table-head-home">
                <th>Project</th>
                <th>Status</th>
                <th>Datum</th>
                <th className="right">Total</th>
                <th className="right">Arbetad</th>
                <th className="right">Återstående</th>
              </thead>
              <tbody>
                {
                  project.map((row) => {
                    return (
                      <tr className="project-line-home">
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td>{row.dateStart} - {row.dateEnd}</td>
                        <td className="right">{row.hours}</td>
                        <td className="right">{row.hoursWorked}</td>
                        <td className="right">{row.hoursLeft}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          
          
        </div>
        
        <div className='report-container'>

          <h2 className="report-header" >Mina tidsrapporter <i class="fa-solid fa-plus" onClick={()=>changeContent2(popuptoggle2)}></i>
          </h2>
          <table className="table-container-home">
          { isLoadingReports && <div className="spinner-center"> <Spinner/></div> } 
              <thead className="table-head-home">
              <th>Datum</th>
                <th>Project</th>
              </thead>
              <tbody>
                {
                  reports.map((row) => {
                    return (
                      <tr className="report-line" onClick={()=>changeContent(row)}>
                        <td>{row.date}</td>
                        <td>{row.projectName}</td>
                        
                        
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        </div>
        
            {/* Pop-Up-Modalen för varje tidrapport */}
        {popuptoggle &&
        <div className="pop-up-container" onClick={changeContent}>
          <div className="pop-up-body" onClick={(e)=>e.stopPropagation()}>
              
            <div className="pop-up-content">
              {popupcontent.map((pop)=>{
                return (
                  <div>
                    <table className="table-container-popup">
                      <thead className="table-head-popup">
                    {/* <p className="text-line">Namn: {pop.personName}</p> */}
                    <th><strong>Projekt: </strong></th>
                    <th><strong>Datum: </strong></th>
                    <th><strong>Timmar: </strong></th>
                    <th><strong>Anteckning: </strong></th>
                    <th><strong>Kommentar: </strong></th>
                    </thead>
                    <tr className="project-line-popup">
                      <td>{pop.projectName}</td>
                      <td>{pop.date}</td>
                      <td>{pop.hours}</td>
                      <td>{pop.note}</td>
                      <td>{pop.comment}</td>
                    </tr>
                  </table>
                  <div className="btn-center"><button className="modalbtn" onClick={changeContent}> Stäng </button></div>
                  </div>
                  
                )
              })}
            </div>
          </div>
        </div>}
      </div>
              {/* Slut på Pop-Up-Modalen */}

              {/* Pop-Up-Modalen för att skapa ny tidsrapport */}
        {popuptoggle2 &&
        <div className="pop-up-container" onClick={changeContent2}>
          <div className="pop-up-body" onClick={(e)=>e.stopPropagation()}>
              <div className="pop-up-header">
            </div>
            <div className="pop-up-content">
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
                refreshPage()
                resetForm();
                changeContent2();
                setSubmitting(false)
              }, 2000)

          }}
          >
          {props => (
          <Form className="container">
            <h1>Skapa ny tidsrapport</h1>
            <CustomSelect className="timeReportInput" label="Projekt" name="project">
              <option value="">Välj projekt</option>  
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
            <CustomTextInput className="timeReportInput" label="Datum" name="date" type="date"/>
            <CustomTextInput className="timeReportInput" label="Timmar" name="hours" type="number" placeholder='ex. 10...'/>
            <CustomTextInput className="timeReportInput" label="Anteckning" name="note" type="text" placeholder='ex. möte...'/>
            <CustomTextInput className="timeReportInput" label="Kommentar" name="comment" type="text" placeholder='ex. löste denna bugg..'/>
            
            

            <button type='submit' className="modalbtn">{props.isSubmitting ? 'laddar...' : 'Skapa Tidsrapport'}</button>
          </Form>
          )}
        </Formik>
            </div>
          </div>
        </div>}
              {/* Slut på Pop-Up-Modalen */}
              
      <Footer/> 
    </>
  );
}

export default Home;
