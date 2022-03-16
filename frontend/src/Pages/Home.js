import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css";
import CreateReport from "./CreateReport";
import { useNavigate } from "react-router-dom";

function Home() {
  const [reports, setReports] = useState([]);
  const [hej, setHej] = useState([]);
<<<<<<< HEAD
  const [pID, setpID] = useState([]);
  let navigate = useNavigate();
=======
  const [popupcontent, setpopupcontent] = useState([]);
  const [popuptoggle, setpopuptoggle] = useState(false);
  const changeContent=(value)=>{
    setpopupcontent([value]);
    setpopuptoggle(!popuptoggle);
  };
>>>>>>> 1464441ad928b9bc6e758a41a84b674af4685afd

  axios.post("http://localhost:3001/getdatabase/sendid").then((res) => {
    setHej(res.data);
  });

  // axios
  // .post("http://localhost:3001/getdatabase/sendPid")
  // .then((res) => {
  //   setpID(res.data);
  // });



  useEffect(() => {
    axios.post("http://localhost:3001/getdatabase/report").then((response) => {
      setReports(response.data);
    });
  }, []);

  return (
    <div className="home-section ">
      <div className="header">
        <h1 className="header-h1">{hej}</h1>
      </div>
      <div className="left-container"></div>
      <div className="report-container">
        {reports.map((value) => {
          return (
<<<<<<< HEAD
            <div
              className="report-card"
              onClick={() => {
                navigate(`/post/${value.id}`);

                  fetch('http://localhost:3001/getdatabase/getPid',{
                    method: 'POST',
                    url: 'https://api.notion.com/v1/pages',
                    body: (
                      JSON.stringify(value.id)),
                    headers: { "Content-Type": 'application/json' }

                  })

                  console.log(JSON.stringify(value.id))

              }}
            >
=======
            <div className='report-card' onClick={()=>changeContent(value)}>
>>>>>>> 1464441ad928b9bc6e758a41a84b674af4685afd
              <ul key={value.id}>
                <li>Date: {value.date}</li>
                <li>Project: {value.projectName}</li>
              </ul>
            </div>
          );
        })}
      </div>
<<<<<<< HEAD
=======

      {popuptoggle && 
      <div className="pop-up-container" onClick={changeContent}>
        <div className="pop-up-body" onClick={(e)=>e.stopPropagation()}>
            <div className="pop-up-header">
            <button onClick={changeContent}> X </button>
          </div>
          <div className="pop-up-content">
            {popupcontent.map((pop)=>{
              return (
                <div className="pop-up-card">
                  <p>Project: {pop.projectName}</p>
                  <p>Date: {pop.date}</p>
                  <p>Hours: {pop.hours}</p>
                  
                  <p>Note: {pop.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>}
>>>>>>> 1464441ad928b9bc6e758a41a84b674af4685afd
    </div>
  );
}

export default Home;
