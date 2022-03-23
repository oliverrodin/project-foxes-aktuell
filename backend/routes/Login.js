const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_API_KEY })
require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddlewares')

router.post("/", async (req, res) => {
    const {name, username, password, email} = req.body
    bcrypt.hash(password, 10).then((hash) => {
        notion.pages.create({
            parent: {
                database_id: process.env.NOTION_PEOPLE_DATABASE_ID
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Email: {
                    email: email,
                },
                Username: {
                    rich_text: [
                        {
                            
                            text: {
                            content: username,
                            },
                        },
                    ],
                },
                Password: {
                    rich_text: [
                        {
                            
                            text: {
                            content: hash,
                            },
                        },
                    ],
                }, 
            }
            
        })
        res.json("SUCCESS")
    })
})

router.post("/login", async (req, res) => {
    const {username, password} = req.body
    
    
    const user = await notion.databases.query({
        database_id: process.env.NOTION_PEOPLE_DATABASE_ID,
        filter: {
            property: "Username",
            title: {
                equals: username
            }
        }
    })
    console.log(user)
    if (!user.results[0]) {
        res.json({error: "User doesn´t match"})
    } else{
        bcrypt.compare(password, user.results[0].properties.Password.rich_text[0].plain_text).then((match) => {
            if (!match) {
                res.json({error: "wrong Username and Password combination"})
            } else {
                const accessToken = sign({
                    name: user.results[0].properties.Name.title[0].plain_text,
                    username: user.results[0].properties.Username.rich_text[0].plain_text,
                    id: user.results[0].id}, "importantsecret"
               )
       
               // const data = user.results.map((pages) => {
               //     return {
               //         name: pages.properties.Name.title[0].plain_text,
               //         username: pages.properties.Username.rich_text[0].plain_text,
               //         id: pages.id
               //     }
                    
               // })
               res.json(accessToken)
            }
    
            
        })
    }

    
    

    
})

router.get('/getuser', validateToken, (req, res) => {
    res.json(req.user)
    console.log(req.user)
})


module.exports = router