const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRoutes = require('./src/index')
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1', apiRoutes)

app.listen(port, () => { console.log(`Service Runnning Using Port : ${port}`) })