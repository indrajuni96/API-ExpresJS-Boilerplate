const express = require('express')
const Route = express.Router()

const exampleRoute = require('./routes/example')

Route
    .use('/example', exampleRoute)

module.exports = Route