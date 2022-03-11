require('dotenv').config()
const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const { createNewReport, notion } = require("../models/notion")
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))


router.get("/", (req, res) => {
    res.send("hi")
})

router.post("/", async (req, res ) => {
    
    const person  = req.body.person
    const project = req.body.project
    const date = req.body.date
    const hours = req.body.hours
    const note = req.body.note
    const comment = req.body.comment
    //await createNewReport( person, project, date, hours, note, comment)
    
    
     await notion.pages.create({
        
        parent: {
          database_id: process.env.NOTION_REPORT_DATABASE_ID,
        },
        properties: {
            Person: {
                relation: [
                    {
                        id: person
                    }
                ]
            }, 
            
            Project: {
                relation: [
                    {
                        
                        id: project
                    },
                ],
            },
             Date: {
                date:{
                start: date
                },
            },
            Hours: {
                number: hours
            },
            Note: {
                title: [
                    {
                        
                        text: {
                        content: note,
                        },
                    },
                    ],
            }, 
            Comment: {
                rich_text: [
                {
                    
                    text: {
                    content: comment,
                    },
                },
                ],
            }, 
        } 
    })   
          
  
    
}) 

module.exports = router