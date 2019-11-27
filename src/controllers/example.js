const exampleModel = require('../models/example')
const cloudImage = require('../helpers/cloudImage')

module.exports = {
    getExample: async (req, res) => {
        await exampleModel.getExample()
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Get data successfully!',
                    totalData: result.length,
                    data: result
                })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    status: 500,
                    message: 'Failed to get data!'
                })
            })
    },
    addExample: async (req, res) => {
        const name = req.body
        const data = name
        const file = req.files.photo

        // Ini upload imagenya belum di taro ke database baru console.log URL Dari Cloudinary
        const imageUpload = await cloudImage.upload(file)
        console.log(imageUpload.url)

        await exampleModel.addExample(data)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Data added successfully!',
                    data,
                    cloudinaryUrlImage: imageUpload.url
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Failed to add data!'
                })
            })
    },
    editExample: async (req, res) => {
        const id = req.params
        const name = req.body
        const data = name

        await exampleModel.editExample(data, id)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Data edited successfully!',
                    data
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Failed to edit data!'
                })
            })
    },
    deleteExample: async (req, res) => {
        const id = req.params

        await exampleModel.deleteExample(id)
            .then(result => {
                res.json({
                    status: 200,
                    message: 'Data deleted successfully!'
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    status: 500,
                    message: 'Failed to delete data!'
                })
            })
    }
}