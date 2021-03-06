require("dotenv").config()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))


//Router
const createTimeReportRouter = require('./routes/CreateTimeReport')
app.use("/createtimereports", createTimeReportRouter)

const getProjectRouter = require('./routes/GetDatabases')
app.use("/getdatabase", getProjectRouter)

const loginRouter = require('./routes/Login')
app.use("/auth", loginRouter)

const projectRouter = require('./routes/Project')
app.use("/project", projectRouter)






app.listen(3001, () => {
    
    console.log("Server is runninng on port 3001")
})