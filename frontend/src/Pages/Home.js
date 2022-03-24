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

function Home() {
  const [reports, setReports] = useState([]);
  const [project, setProject] = useState([]);
  const [hej, setHej] = useState([]);
  const [popupcontent, setpopupcontent] = useState([]);
  const [popuptoggle, setpopuptoggle] = useState(false);
  const [popuptoggle2, setpopuptoggle2] = useState(false);
  const { name } = useContext(LoginContext);
  const changeContent=(value)=>{
    setpopupcontent([value]);
    setpopuptoggle(!popuptoggle);
  };
  let navigate = useNavigate();

  const changeContent2=()=>{
    setpopuptoggle2(!popuptoggle2)
  }


  
  
  useEffect(() => {
    axios
      .post("http://localhost:3001/getdatabase/report", {data: ""}, { headers: {accessToken: sessionStorage.getItem("accessToken")} } )
      .then((response) => {
        setReports(response.data);
        
      });

    axios
      .post("http://localhost:3001/getdatabase/activeproject", {data: ""}, { headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }})
      .then((response) => {
        setProject(response.data)
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
          
            <table className=" table-container-home">
              <thead className="table-head-home">
                <th>Project</th>
                <th>Status</th>
                <th>Datum</th>
                <th>Tid</th>
              </thead>
              <tbody>
                {
                  project.map((row) => {
                    return (
                      <tr className="project-line-home">
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td>{row.dateStart} - {row.dateEnd}</td>
                        <td>{row.hours}</td>
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
                        <td></td>
                        
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
              <div className="pop-up-header">
              <button className="modalbtn" onClick={changeContent}> X </button>
            </div>
            <div className="pop-up-content">
              {popupcontent.map((pop)=>{
                return (
                  <div className="pop-up-card">
                    <p className="text-line">Namn: {pop.personName}</p>
                    <p className="text-line">Projekt: {pop.projectName}</p>
                    <p className="text-line">Datum: {pop.date}</p>
                    <p className="text-line">Timmar: {pop.hours}</p>
                    <p className="text-line">Anteckning: {pop.note}</p>
                    <p className="text-line">Kommentar: {pop.comment}</p>
                    <form className="pop-up-input">
                    <label>
                      Lägg till kommentar:
                      <input type="text" name="name" />
                    </label>
                  </form>
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
              <button className="modalbtn" onClick={changeContent2}> X </button>
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
                navigate("/home")
                resetForm();
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
            
            

            <button type='submit' className="btnPos">{props.isSubmitting ? 'laddar...' : 'Skapa Tidsrapport'}</button>
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
