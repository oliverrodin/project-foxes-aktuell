const { Client } = require('@notionhq/client')


const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getReportDatabase() {

    const response = await notion.databases.retrieve({
        parent: {
            database_id: process.env.NOTION_REPORT_DATABASE_ID
        }, 
        
    })
    
    console.log(response)
}

