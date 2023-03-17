const express = require('express')
const app = express()

//db
const db = require('./config/db')

app.use(express.json())

//router
const router = require('./router/router')

app.use('/',router)

app.listen(8080, console.log('rodando na porta 8080'))