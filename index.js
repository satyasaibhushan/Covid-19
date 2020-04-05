const express = require('express');
const app = express();
const env = require("dotenv").config()

app.use(express.static('docs'));

const listener = app.listen(process.env.PORT || 3000 ,_=>{
    console.log('started listening on '+ listener.address().port)
})