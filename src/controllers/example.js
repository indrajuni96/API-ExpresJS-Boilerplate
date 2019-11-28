const exampleModel = require('../models/example')
const cloudImage = require('../helpers/cloudImage')
const schema = require('../configs/validation')

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
        const data = {
            name: req.body.name
        }
        const validation = schema.example_add.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

        if (!req.files) {
            return res.status(400).json({
                status: 400,
                message: "Field image can't be null"
            })
        }

        const file = req.files.photo
        let imageExtension = file.name.split('.')[1]
        let isImage = ["png", "jpg", "jpeg", "svg", "gif"].includes(imageExtension)
        // console.log(isImage)

        if (!isImage) {
            return res.status(400).json({
                status: 400,
                message: `Please upload an image file not ${imageExtension} file`
            })
        }
        // Ini upload imagenya belum di taro ke database baru console.log URL Dari Cloudinary
        const imageUpload = await cloudImage.upload(file)
        // console.log(imageUpload.url)

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
        const data = {
            name: req.body.name
        }
        const validation = schema.example_edit.validate(data)

        if (validation.error) {
            return res.status(400).json({
                status: 400,
                message: validation.error.details[0].message
            });
        }

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