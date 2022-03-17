import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Report.css";
<<<<<<< HEAD
import CreateReport from "./CreateReport";
import { useNavigate } from "react-router-dom";
=======
import { LoginContext } from '../Context/LoginContext'
import "./Modal.css"; 

>>>>>>> 212a31e1d33d3f12d32bcfa408d776ef663e1585

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

<<<<<<< HEAD
  axios.post("http://localhost:3001/getdatabase/sendid").then((res) => {
    setHej(res.data);
  });

  // axios
  // .post("http://localhost:3001/getdatabase/sendPid")
  // .then((res) => {
  //   setpID(res.data);
  // });

=======

  
  
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
      
    
>>>>>>> 212a31e1d33d3f12d32bcfa408d776ef663e1585


  useEffect(() => {
    axios.post("http://localhost:3001/getdatabase/report").then((response) => {
      setReports(response.data);
    });
  }, []);

  return (
    <div className="home-section ">
      <div className="header">
<<<<<<< HEAD
        <h1 className="header-h1">{hej}</h1>
=======
        <h1 className="header-h1">{name}</h1> 
      </div>
      <div className="left-container">
        <h2>Projekt</h2>
        {
          project.map((value) => {
            
              return (
                <div>
                  <ul key={value.id} className="project-card">
                    
                    <li className="project-lines">Project: {value.name}</li>
                    <li className="project-lines">Start: {value.dateStart}</li>
                    <li className="project-lines">End: {value.dateEnd} </li>
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
>>>>>>> 212a31e1d33d3f12d32bcfa408d776ef663e1585
      </div>
      <div className="left-container"></div>
      <div className="report-container">
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
  );
}

export default Home;
