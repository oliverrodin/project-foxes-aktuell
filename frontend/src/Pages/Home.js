import React, { useState, useEffect, useContext } from "react";
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

      <div className="left-container">
        <h2>Projekt</h2>
        <div className="project-grid">
          {
            project.map((value) => {
          
                return (
                  <div>
                    <ul key={value.id} className="project-card">
          
                      <li className="project-lines">Projekt: {value.name}</li>
                      <li className="project-lines">Startdatum: {value.dateStart}</li>
                      <li className="project-lines">Slutdatum: {value.dateEnd} </li>
                      <li className="project-lines">Totaltid: {value.hours} timmar</li>
                      <li className="project-lines">Jobbat: {value.hoursWorked} timmar</li>
                      <li className="project-lines">Tid kvar: {value.hoursLeft} timmar</li>
                      <li className="project-lines">
                        Status:
                         <span className={value.color}>{value.status}</span>
                      </li>
                    </ul>
                  </div>
                )
            })
          }
        </div>
      </div>

      <div className="left-container"></div>
      <div className='report-container'>
        <h2>Mina tidsrapporter</h2>
        {reports.map((value) => {
          return (
            <div className='report-card' onClick={()=>changeContent(value)}>
              <ul key={value.id}>
                <li>Datum: {value.date}</li>
                <li>Projekt: {value.projectName}</li>                
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
                  <p>Namn: {pop.personName}</p>
                  <p>Projekt: {pop.projectName}</p>
                  <p>Datum: {pop.date}</p>
                  <p>Timmar: {pop.hours}</p>
                  <p>Anteckning: {pop.note}</p>
                  <p>Kommentar: {pop.comment}</p>
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
