const { Client } = require('@notionhq/client')
const { text } = require('express')
const notion = new Client({ auth: process.env.NOTION_API_KEY })
require('dotenv').config()
const express = require('express')
const { validateToken } = require('../middlewares/AuthMiddlewares')
const router = express.Router()


router.post("/getprojects", validateToken, async (req, res) => {
    const db = await notion.databases.query({
        database_id: process.env.NOTION_PROJECT_DATABASE_ID,
    })

    const results = db.results.map((row) => {
        return {
            id: row.id,
            name: row.properties.Name.title[0].plain_text
        }
    })

    res.json(results)
})



router.post('/', validateToken, async( req, res) => {
    const id = req.user.id
    const project = req.body.project
    const dateFrom = req.body.dateFrom
    const dateTo = req.body.dateTo
    const response = await notion.databases.query({
        database_id: process.env.NOTION_REPORT_DATABASE_ID,
        filter: {
            and: [
                {
                    property: "Date",
                    created_time: {
                        on_or_after: dateFrom
                    }
                },
                {
                    property: "Date",
                    created_time: {
                        on_or_before: dateTo
                    }
                },
                {
                    property: "Project_Name",
                    rollup: {
                    
                        any: {
                            rich_text: {
                                contains: project
                            }
                        }
                    }

                },
                
                
            ]
            
        }
    })

    console.log(req.body)
    
    
    const results = await response.results.map((page) => {
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