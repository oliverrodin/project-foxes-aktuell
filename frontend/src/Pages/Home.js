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
      <div className="header">
        <h1 className="header-h1">{name}</h1> 
      </div>
      <div className="left-container">
        <h2>Projekt</h2>
        <div className="project-grid">
          {
            project.map((value) => {
          
                return (
                  <div>
                    <ul key={value.id} className="project-card">
          
                      <li className="project-lines">Project: {value.name}</li>
                      <li className="project-lines">Start: {value.dateStart}</li>
                      <li className="project-lines">End: {value.dateEnd} </li>
                      <li className="project-lines">Total: {value.hours} hours</li>
                      <li className="project-lines">Worked: {value.hoursWorked} hours</li>
                      <li className="project-lines">Left: {value.hoursLeft} hours</li>
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
      <div className='report-container'>
        
         {reports.map((value) => {
            return (
              <div className='report-card'>
                <ul key={value.id}>
                  <li>Date: {value.date}</li>
                  <li>Project: {value.projectName}</li>
                  
                </ul>
              </div>
            );
          })} 
        <div className="header-h1">{hej}</div> 
      </div>
      <div className="left-container"></div>
      <div className='report-container'>
        {reports.map((value) => {
          return (
            <div className='report-card' onClick={()=>changeContent(value)}>
              <ul key={value.id}>
                <li>Date: {value.date}</li>
                <li>Project: {value.projectName}</li>
                
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
                  <p>Name: {pop.personName}</p>
                  <p>Project: {pop.projectName}</p>
                  <p>Date: {pop.date}</p>
                  <p>Hours: {pop.hours}</p>
                  <p>Note: {pop.note}</p>
                  <p>Comment: {pop.comment}</p>
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
