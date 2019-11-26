// Import
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

// Controllers
module.exports = {
    registerUser: async (req, res) => {
        // Get data form req BODY
        const { username, email, password } = req.body

        // Hash Password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const data = {
            avatar: "https://ui-avatars.com/api/?size=256&name=" + username,
            username,
            email,
            password: hashPassword
        }

        await userModel.registerUser(data)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'User os registered successfully!',
                    data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Register failed!'
                })
            })
    }
}
