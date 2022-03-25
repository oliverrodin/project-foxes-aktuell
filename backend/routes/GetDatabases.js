const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_API_KEY })
require('dotenv').config()
const express = require('express')
const { validateToken } = require('../middlewares/AuthMiddlewares')
const router = express.Router()

let filterId = ""
let filterName = ""

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



router.post("/project", validateToken, async (req, res) => {
    const pageId = req.user.id
    const db = await notion.databases.query({
        database_id: process.env.NOTION_PROJECT_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "Property",
                    relation:{
                        contains: pageId
                    }
                },
                {
                    property: "Status",
                    select:{
                        equals: "Active"
                    }
                }
            ]


            
        }
    })
    
    const results = db.results.map((page) => {
        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text 

        }
    })

    
    res.json(results)
})

router.post("/activeproject", validateToken, async (req, res) => {
    const pageId = req.user.id
    const db = await notion.databases.query({
        database_id: process.env.NOTION_PROJECT_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "Property",
                    relation:{
                        contains: pageId
                    }
                },
                {
                    property: "Status",
                    select:{
                        equals: "Active"
                    }
                }
            ]


            
        }
    })
    
    const results = db.results.map((page) => {
        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text, 
            dateStart: page.properties.Date.date.start,
            dateEnd: page.properties.Date.date.end,
            status: page.properties.Status.select.name,
            color: page.properties.Status.select.color,
            hours: page.properties.Hours.number,
            hoursWorked: page.properties.Worked_hours.rollup.number,
            hoursLeft: page.properties.Hours_left.formula.number

            
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
            name: page.properties.Name.title[0].plain_text,
            hours: page.properties.Hours.rollup.number
        }
    })

    
    res.json(results)
})

router.post("/report", validateToken, async (req, res) => {
    const pageId = req.user.id
    console.log(pageId)
    const response = await notion.databases.query({
        database_id: process.env.NOTION_REPORT_DATABASE_ID,   
        filter: {
            property: "Person",
            relation: {
                
                    contains: pageId
                
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