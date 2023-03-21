const express = require('express')
const app = express()
const cors = require('cors')

//cors
const corsOptions = {
  origin: ['https://vite-umber-six.vercel.app/', 'https://vite-umber-six.vercel.app/all', 'https://crudmongo-2kgo.onrender.com/all']
};
app.use(cors(corsOptions));



//db
const db = require('./config/db')

app.use(express.json())

//router
const router = require('./router/router')

app.use('/',router)

app.listen(8080, console.log('rodando na porta 8080'))
