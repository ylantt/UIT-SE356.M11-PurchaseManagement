const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // use PUT, Delete,...
const productRouter = require('./routes/productRouter')

let app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(methodOverride('_method'))

app.use('/', productRouter)

module.exports = app
