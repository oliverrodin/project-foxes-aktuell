import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, yupToFormErrors } from "formik";
import Table from 'react-bootstrap/Table'

import * as Yup from "yup";
import axios from "axios";
import "./Project.css";
import 'bootstrap/dist/css/bootstrap.css';

import CustomTextInput from "../Components/CustomTextInput";
import CustomSelect from "../Components/CustomSelect";

import Navbar from "./Navbar";

function Project() {
  const navigate = useNavigate();
  const [person, setPerson] = useState([]);
  const [project, setProject] = useState([]);
  const [filtProject, setFiltProject] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [projectName, setProjectName] = useState("")


  
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
    <div >
      <Navbar />
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
            { setSubmitting, resetForm },
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

            setTimeout(() => {
              resetForm();
              setSubmitting(false);
              setIsPressed(true);
            }, 2000);

            console.log(values);
          }}>
          {(props) => (
            <>
              <h3>
                {isPressed
                  ? " "
                  : "Välj projekt och tidspan för att se mer information"}
              </h3>
              <Form className='admin-container'>
                <CustomSelect
                  className='admin-form'
                  label='Medarbetare'
                  name='person'>
                  <option value=''>Välj medarbetare</option>
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
                  label='Projekt'
                  name='project'>
                  <option value=''>Välj projekt</option>
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
                  label='Från: '
                  name='dateFrom'
                  type='date'
                />
                <CustomTextInput
                  className='admin-form'
                  label='Till: '
                  name='dateTo'
                  type='date'
                />

                <button
                  type='submit'
                  className='admin-form admin-button'>
                  {props.isSubmitting
                    ? "loading..."
                    : "Submit"}
                </button>
              </Form>
            </>
          )}
        </Formik>

        <div className='filtered-reports-container'>
          <h1>
            {isPressed
              ? "Projekt: " + projectName
              : " "}
          </h1>
          
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Datum</th>
                <th>Namn</th>
                <th>Timmar</th>
              </tr>
            </thead>
            <tbody>
              {
                filtProject.map((row) => {
                  return (
                    <tr>
                      <td>{row.date}</td>
                      <td>{row.personName}</td>
                      <td>{row.hours}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          {/* {filtProject.map((row) => {
            return (
              <ul className="admin-card">
                <li className="admin-card-line">{"Datum: " + row.date}</li>
                <li>{"Namn: " + row.personName}</li>
                <li>{"Timmar: " + row.hours}</li>
              </ul>
            );
          })} */}

          <h3>
            {summing()}
            {isPressed
              ? "Totalt " + sumHours + " timmar"
              : " "}
          </h3>
          <h3>
            {isPressed
              ? "Vald period: " + dateFrom + " - "
              : " "}{" "}
            {isPressed ? dateTo : " "}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Project;
