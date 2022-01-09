const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // use PUT, Delete,...
const suggestionRouter = require('./routes/suggestionRouter')

let app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(methodOverride('_method'))

app.use('/', suggestionRouter)

module.exports = app
