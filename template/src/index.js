import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import router from './routes'
const app = express()
app.use(express.static(path.join(__dirname, './client')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
export default {
    app,
    router
}