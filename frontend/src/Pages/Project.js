import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";


import * as Yup from "yup";
import axios from "axios";
import "./Project.css";
import "./Footer.css"


import CustomTextInput from "../Components/CustomTextInput";
import CustomSelect from "../Components/CustomSelect";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Spinner from "../Components/Spinner";
import Weeks from "./Weeks";

function Project() {
  const navigate = useNavigate();
  const [person, setPerson] = useState([]);
  const [project, setProject] = useState([]);
  const [filtProject, setFiltProject] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
 
  

  
  let sumHours = 0;

  const summing = () => {
    const results = filtProject.map((row) => {
      return (sumHours += row.hours);
    });
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/project/getprojects",
        { data: "" },
        {
          headers: {
            accessToken:
              sessionStorage.getItem("accessToken"),
          },
        },
      )
      .then((response) => {
        setProject(response.data);
      });
    axios
      .post(
        "http://localhost:3001/project/people",
        { data: "" },
        {
          headers: {
            accessToken:
              sessionStorage.getItem("accessToken"),
          },
        },
      )
      .then((response) => {
        setPerson(response.data);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Weeks />
      
      <div className='project-page'>
      
        <Formik
          initialValues={{
            person: "",
            project: "",
            dateFrom: "",
            dateTo: "",
          }}
          validationSchema={Yup.object().shape({
            person: Yup.string().required(),
            project: Yup.string().required(),
            dateFrom: Yup.string().required(),
            dateTo: Yup.string().required(),
          })}
          onSubmit={(
            values,
            { setSubmitting, resetForm, },
            
          ) => {
            if (
              values.person ===
                "b0c48f83-d4ee-4006-85fb-fa3f505dc9ff" &&
              values.project === "Alla projekt"
            ) {
              
              axios
                .post(
                  "http://localhost:3001/project/justdate",
                  values,
                  {
                    headers: {
                      accessToken:
                        sessionStorage.getItem(
                          "accessToken",
                        ),
                    },
                  },
                )
                .then((res) => {
                  
                  setFiltProject(res.data);
                  console.log(values.dateFrom);
                });
                setProjectName(values.project)
            } else if (values.person !== "b0c48f83-d4ee-4006-85fb-fa3f505dc9ff" &&
            values.project !== "Alla projekt") {
              axios
                .post(
                  "http://localhost:3001/project/unique",
                  values,
                  {
                    headers: {
                      accessToken:
                        sessionStorage.getItem(
                          "accessToken",
                        ),
                    },
                  },
                )
                .then((res) => {
                  setFiltProject(res.data);
                  console.log(values.dateFrom);
                  
                });
                setProjectName(values.project)
            }else {
              axios
                .post(
                  "http://localhost:3001/project",
                  values,
                  {
                    headers: {
                      accessToken:
                        sessionStorage.getItem(
                          "accessToken",
                        ),
                    },
                  },
                )
                .then((res) => {
                  setFiltProject(res.data);
                  console.log(values.dateFrom);
                });
                setProjectName(values.project)
            }
            console.log(projectName)
            setDateFrom(values.dateFrom);
            setDateTo(values.dateTo);
            setIsLoading(true)
            setTimeout(() => {
              resetForm();
              setIsLoading(false);
              setSubmitting(false);
              setIsPressed(true);
            }, 500);

            console.log(values);
          }}>
          {(props) => (
            <>
              <h3 className="project-header">
                {isPressed
                  ? " "
                  : "V??lj projekt och tidsperiod f??r att se mer information"}
              </h3>
              <Form className='admin-container'>
              
                <CustomSelect
                  className='admin-form'
                  label='Medarbetare:'
                  name='person'>
                  <option value=''>V??lj medarbetare</option>
                  <option value='b0c48f83-d4ee-4006-85fb-fa3f505dc9ff'>
                    Alla medarbetare
                  </option>         
                          
                  {person.map((pages) => {
                    return (
                      <>
                        <option value={pages.id}>
                          {pages.name}
                        </option>
                      </>
                    );
                  })}
                </CustomSelect>
                   
                <CustomSelect
                  className='admin-form'
                  label='Projekt:'
                  name='project'>
                  <option value=''>V??lj projekt</option>
                  <option value='Alla projekt'>
                    Alla projekt
                  </option>                  
                  {project.map((pages) => {
                    return (
                      <>
                        <option value={pages.name}>
                          {pages.name}
                        </option>
                      </>
                    );
                  })}
                </CustomSelect>
                
                <CustomTextInput
                  className='admin-form'
                  label='Fr??n:'
                  name='dateFrom'
                  type='date'
                />
                <CustomTextInput
                  className='admin-form'
                  label='Till:'
                  name='dateTo'
                  type='date'
                />

                <button
                  type='submit'
                  className='admin-button'>
                  {props.isSubmitting
                    ? "Laddar..."
                    : "Visa rapporter "}
                </button>
              </Form>
            </>
          )}
        </Formik>

        <div className='table-container-report'>
        { isLoading && <div> <Spinner/></div> } 
          <h2 className="project-name">
            {isPressed
              ? projectName
              : " "}
          </h2>
          <h3 className="project-date">
            {isPressed
              ? "Vald period: " + dateFrom + " - "
              : " "}{" "}
            {isPressed ? dateTo : " "}
          </h3>
          
          <table className="table" >
            {isPressed ? <th className="table-head"> Datum:  </th> : " " }
            {isPressed ? <th className="table-head"> Projekt:  </th> : " " }
            {isPressed ? <th className="table-head"> Medarbetare:  </th> : " " }
            {isPressed ? <th className="table-head"> Rapporterade timmar: {summing()}{sumHours}</th> : " " }
          {filtProject.map((row) => {
            return (
              
              <tr className="project-line">
                <td className="td">{row.date}</td>
                <td className="td">{row.projectName}</td>
                <td className="td">{row.personName}</td>
                <td className="td">{row.hours}</td>
              </tr>
            );
          })}
         
          </table>
        </div> 
        
      </div>
    
    <Footer />
    
    </>
  );
}

export default Project;
