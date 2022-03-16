import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Formik, Form} from 'formik'
import axios from 'axios'

//PAge
import CustomSelect from '../Components/CustomSelect'



function Login() {
    const [person, setPerson] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:3001/getdatabase/people").then((response)=>{
            setPerson(response.data)
            console.log(response.data)
        })
    }, [])

    const onSubmit = (value) => {
        fetch('http://localhost:3001/getdatabase/getid',{
            method: 'POST',
            url: 'https://api.notion.com/v1/pages',
            body: (
              JSON.stringify(value)),
            headers: { "Content-Type": 'application/json' }
          }) 

        
        console.log(JSON.stringify(value))
        navigate("/home")
    }
    
  return (
    <div>
         <Formik initialValues={{id: ""}} onSubmit={onSubmit}>
                {props=>(
                    <Form>
                    <CustomSelect name="id">
                         <option value="">Select person</option>
                            {
                                person.map((pages) => {
                                    return (
                                    <>
                                        <option value={pages.id}>{pages.name}</option> 
                                    </>
                                    )
                                    
                                })
                            } 
                    </CustomSelect>
                        <button type="submit">Välj Person</button>
                    </Form>
                )}
            </Formik>
    </div>
  )
}

export default Login