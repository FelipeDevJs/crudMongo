const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())

//db
const db = require('./config/db')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
const router = require('./router/router')

app.use('/',router)

app.listen(8080, console.log('rodando na porta 8080'))