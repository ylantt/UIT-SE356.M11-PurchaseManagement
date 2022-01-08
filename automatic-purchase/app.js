const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // use PUT, Delete,...
const automaticPurchaseRouter = require('./routes/automaticPurchaseRoutes')
const dotenv = require('dotenv')

dotenv.config({ path: '../config.env' })

const port = process.env.AUTOMATIC_PURCHASE_PORT || 5008

let app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(methodOverride('_method'))

app.use('/', automaticPurchaseRouter)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
}) // start the server
