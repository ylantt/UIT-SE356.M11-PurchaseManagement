const express = require('express')
const path = require('path')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') // use PUT, Delete,...
const notificationRoute = require('./routes/notiRoutes')

let app = express()

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json())

//Store the vapid key
const publicKey = 'BGkLKR8KcpIwwUFm9fhVSiclSz1UKWcT7a9Kf6jqZ1h-bqJT22tpKlZ8ZSN1wtG9uTtynUoiwzenttDR-6DSwto';
const privateKey = 'vKG72oxqDiBFFq0cXDsdUjyN8zNvGaGF_YJSo3XpBu8';

webpush.setVapidDetails('mailto:test123@gmail.com', publicKey, privateKey);

app.use(methodOverride('_method'))
app.use('/', notificationRoute)

module.exports = app
