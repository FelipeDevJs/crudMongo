const express = require('express')
const app = express()
const cors = require('cors')

//cors
const corsOptions = {
  origin: 'https://vite-qila8wr31-felipe-gmailcom.vercel.app'
};
app.use(cors(corsOptions));

//db
const db = require('./config/db')

app.use(express.json())

//router
const router = require('./router/router')

app.use('/',router)

app.listen(8080, console.log('rodando na porta 8080'))
