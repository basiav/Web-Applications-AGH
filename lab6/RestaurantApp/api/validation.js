// Validation
const Joi = require('@hapi/joi');

const registerValidation = async (data) => {
    const schema = Joi.object({
        nick: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl'] } }),
        password: Joi.string().min(8).max(1024).required()
    });
    return schema.validateAsync(data);
}

const loginValidation = async (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).trim().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(8).max(1024).trim().required()
    });
    return schema.validateAsync(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

