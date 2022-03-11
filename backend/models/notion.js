const { Client } = require('@notionhq/client')


const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getReportsInformation () {
    const response = await notion.databases.query({
        parent: {
            database_id: process.env.NOTION_REPORT_DATABASE_ID
        }
    })
    console.log(response.results)
}
//createNewReport({person: 'Oliver Rodin', project: 'node.js', date: '2022-04-14', hours: 10, note: 'Hello'})
function createNewReport(person, project, date, hours, note) {
    notion.pages.create({
      parent: {
        database_id: process.env.NOTION_REPORT_DATABASE_ID,
      },
      properties: {
        "Person": {
          title: [
            {
              type: "text",
              text: {
                content: person,
              },
            },
          ],
        },
        "Project": {
          rich_text: [
            {
              type: "text",
              text: {
                content: project,
              },
            },
          ],
        },
        "Date": {
          type: "date",
          date:{
            start: date
          },
        },
        "Hours": {
          type: "number",
          number: hours,
        },
        "Note": {
            rich_text: [
              {
                type: "text",
                text: {
                  content: note,
                },
              },
            ],
          },
      },
    })
  }

module.exports = {
    getReportsInformation,
    createNewReport,
    notion
}
