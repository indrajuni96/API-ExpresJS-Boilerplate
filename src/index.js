// Import
const express = require('express')
const Route = express.Router()

// Define
const exampleRoute = require('./routes/example')
// const userRoute = require('./routes/userRoute')
const userRoute = require('./routes/userRoute')

// Route
Route
    .use('/example', exampleRoute)
    .use('/user', userRoute)

module.exports = Route