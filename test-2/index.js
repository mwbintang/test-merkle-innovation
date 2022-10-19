require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const route = require('./route')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', route)

app.use(errorHandler)

module.exports = app;