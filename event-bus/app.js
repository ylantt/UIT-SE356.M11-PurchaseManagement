const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // use PUT, Delete,...
const inventoryRouter = require('./routes/eventBusRoutes')
const dotenv = require('dotenv')

dotenv.config({ path: '../config.env' })

const port = process.env.EVENT_BUS_PORT || 5011

let app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(methodOverride('_method'))

app.use('/', inventoryRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
}) // start the server
