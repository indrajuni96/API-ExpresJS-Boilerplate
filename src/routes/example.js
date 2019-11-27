const express = require('express')
const route = express.Router()

const exampleController = require('../controllers/example')
const authMiddleware = require('../middleware/verifyToken')

route
    .get('/', authMiddleware.isAuth, exampleController.getExample)
    .post('/create', exampleController.addExample)
    .put('/update/:id', exampleController.editExample)
    .delete('/delete/:id', exampleController.deleteExample)

module.exports = route