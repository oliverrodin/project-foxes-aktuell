const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_API_KEY })
require('dotenv').config()
const express = require('express')
const router = express.Router()

let filterId = ""; 
let filterName = "";
let projectId = "";

router.get("/", (req, res) => {
    res.send("hi")
})



router.post("/sendid", (req, res) => {
    let id = filterId;
    res.json(id)
})
router.post("/getid", async (req, res) => {
    const id = req.body.id
    filterId = id
})


router.post("/sendPid", (req, res) => {
    let Pid = projectId;
    res.json(Pid)
})
router.post("/getPid", async (req, res) => {
    const Pid = req.body;
    projectId = Pid
    res.send(projectId)
})




router.post("/project", async (req, res) => {
    const db = await notion.databases.query({
        database_id: process.env.NOTION_PROJECT_DATABASE_ID
    })

    const results = db.results.map((page) => {
        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text 
        }
    })

    
    res.json(results)
})

router.post("/people", async (req, res) => {
    const db = await notion.databases.query({
        database_id: process.env.NOTION_PEOPLE_DATABASE_ID
    })

    const results = db.results.map((page) => {
        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text 
        }
    })

    
    res.json(results)
})

//   router.post("/reportID", async (req, res) => {
    
//       const response = await notion.databases.query({
//           database_id: process.env.NOTION_REPORT_DATABASE_ID,   
//           filter: {
//              property: "Project",
//              relation: {
                
//                      contains: projectId
                
//              }
//          }
//      })
//  })

router.post("/report", async (req, res) => {
    
    const response = await notion.databases.query({
        database_id: process.env.NOTION_REPORT_DATABASE_ID,   
        filter: {
            property: "Person",
            relation: {
                
                    contains: filterId
                
            }
        }
    })


    



    const  results =  response.results.map((page) => {
        return {
            id: page.id,
            personName: page.properties.Person_Name.rollup.array[0].title[0].plain_text,
            projectName: page.properties.Project_Name.rollup.array[0].title[0].plain_text,
            date: page.properties.Date.date.start,
            hours: page.properties.Hours.number,
            note: page.properties.Note.title[0].plain_text,
            comment: page.properties.Comment.rich_text[0].plain_text
        }

       

        
    })

    res.json(results)
})


















module.exports = router