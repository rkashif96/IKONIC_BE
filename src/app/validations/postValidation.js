const Joi = require('joi')

postValidationSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    content: Joi.string()
        .min(3)
        .max(100)
        .required(),
    Author: Joi.string()
        .min(3)
        .max(100)
        .required()
})

module.exports = {
    postValidationSchema
}