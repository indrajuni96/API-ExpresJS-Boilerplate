// Import 
const Joi = require('@hapi/joi')

// Schemas
module.exports = {
    example_add: Joi.object({
        name: Joi.string()
            .min(5)
            .required(),
    }),
    example_edit: Joi.object({
        name: Joi.string()
            .min(5)
            .required(),
    }),
    user_register: Joi.object({
        username: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(8)
            .required()
    }),
    user_login: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(8)
            .required()
    })
}