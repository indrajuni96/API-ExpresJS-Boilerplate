// Import
const conn = require('../configs/config')

// Models
module.exports = {
    registerUser: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO users SET ?', data,
                (error, result) => {
                    if (!error) {
                        resolve(result)
                    } else {
                        reject(new Error(error))
                    }
                })
        })
    }
}