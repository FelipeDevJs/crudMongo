const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.json('ola')
})

app.listen(8080, console.log('rodando na porta 8080'))