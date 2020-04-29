const joi = require('@hapi/joi');
//########################################################################################
//this is for checking the input from users to makesure it matches the requirements
//########################################################################################


const registerValidation = (data) => {
    const validationSchema = {
        firstName: joi.string().min(2).required(),
        lastName: joi.string().min(3).required(),
        username: joi.string().min(6).required(),
        email: joi.string().min(10).email().required(),
        password: joi.string().min(8).required()
    };
    return joi.Validate(data, validationSchema);
};


const loginValidation = (data) => {
    const validationSchema = {
        firstName: joi.string().min(2).required(),
        lastName: joi.string().min(3).required(),
        username: joi.string().min(6).required(),
        email: joi.string().min(10).email().required(),
        password: joi.string().min(8).required()
    };
    return joi.Validate(data, validationSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;