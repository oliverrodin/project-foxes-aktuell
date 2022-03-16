import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css";
import CreateReport from "./CreateReport";
import { useNavigate } from "react-router-dom";

function Home() {
  const [reports, setReports] = useState([]);
  const [hej, setHej] = useState([]);
  const [pID, setpID] = useState([]);
  let navigate = useNavigate();

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
              <ul key={value.id}>
                <li>Date: {value.date}</li>
                <li>Project: {value.projectName}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
