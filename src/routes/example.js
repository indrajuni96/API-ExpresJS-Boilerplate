const express = require('express')
const route = express.Router()

const exampleController = require('../controllers/example')

route
    .get('/', exampleController.getExample)
    .post('/create', exampleController.addExample)
    .put('/update/:id', exampleController.editExample)
    .delete('/delete/:id', exampleController.deleteExample)

module.exports = route