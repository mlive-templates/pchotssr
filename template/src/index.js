const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./routes')
const app = express()

app.use(express.static(path.join(__dirname, '../build/client')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
module.exports = {
    app,
    router
}