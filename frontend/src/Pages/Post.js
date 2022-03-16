import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Post() {
  let { id } = useParams();
  const [reports, setReports] = useState([]);
  const [hej, setHej] = useState([]);
  const [person, setPerson] = useState([])


  axios.post("http://localhost:3001/getdatabase/sendPid")
  .then((res) => {
     setHej(res.data)
    
  })



  useEffect(() => {
    axios
      .post("http://localhost:3001/getdatabase/reportID")
      .then((response) => {
        setReports(response.data);

        axios.post("http://localhost:3001/getdatabase/people").then((response) => {
            setPerson(response.data)
            
          }) 
      });


     
    })




  return (
    <div>
      {reports.map((value) => {
        return (
          <ul key={value.id}>

            <li><strong>Date:</strong> {value.date}</li>
            <li><strong>Note:</strong> {value.note}</li>
            <li><strong>Hours:</strong>: {value.hours}</li>
            <li><strong>Comment:</strong>: {value.comment}</li>
            <li><strong>ProjectName:</strong>: {value.projectName}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default Post;
