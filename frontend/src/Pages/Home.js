import React, { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import "./Report.css";
import { LoginContext } from '../Context/LoginContext'
import "./Modal.css"; 

import Navbar from './Navbar'

function Home() {
  const [reports, setReports] = useState([]);
  const [project, setProject] = useState([]);
  const [hej, setHej] = useState([]);
  const [popupcontent, setpopupcontent] = useState([]);
  const [popuptoggle, setpopuptoggle] = useState(false);
  const { name } = useContext(LoginContext);
  const changeContent=(value)=>{
    setpopupcontent([value]);
    setpopuptoggle(!popuptoggle);
  };


  
  
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
    <div className="home-section ">

      <div className="project-container">
        <h2>Mina projekt <Link to="/project" className="link">
            <i class="fa-solid fa-plus" ></i>
          </Link></h2>
        <div className="project-grid">
          {
            project.map((value) => {
          
                return (
                  <div className="project-card">
                    <ul key={value.id} className="project-first-line">
                      <li className="project-lines">| Projekt: {value.name} |</li>
                      <li className="project-lines"> Datum: {value.dateStart} -{">"} {value.dateEnd} |</li>
                      <li className="project-lines"> Status:
                          <span className={value.color}>{value.status}</span> |
                      </li>
                    </ul>
                    <ul className="project-second-line">
                      <li className="project-lines">| Totaltid: {value.hours} timmar |</li>
                      <li className="project-lines">Jobbat: {value.hoursWorked} timmar |</li>
                      <li className="project-lines">Tid kvar: {value.hoursLeft} timmar |</li>
                      
                    </ul>
                  </div>
                )
            })
          }
        </div>
      </div>

      
      <div className='report-container'>
        <h2 className="report-header">Mina tidsrapporter <Link to="/createreport" className="link">
            <i class="fa-solid fa-plus" ></i>
          </Link>
        </h2>
        <h2 className="plus"></h2>
        {reports.map((value) => {
          return (
            <div className='report-card' onClick={()=>changeContent(value)}>
              <ul key={value.id}>
                <li className="report-lines">Datum: {value.date}</li>
                <li className="report-lines">Projekt: {value.projectName}</li>                
              </ul>
            </div>
          );
        })}
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
              {/* Slut på Pop-Up-Modalen */}
    </div>
    </>
  );
}

export default Home;
