const {payrateSchema, employeeSchema} = require('./schema')
const ExpressError = require('./expressError');

// Validation payRate
module.exports.validatePayrate = (req, res, next) => {
    // using Joi Validation middleware
    const {error} = payrateSchema.validate(req.body);
    if (error) {
        const msg = error.details.map( el => el.message).join(',');
        throw new  ExpressError(msg, 400);
    }
    else {
        next();
    }
} 

// Validation employee
module.exports.validateEmployee = (req, res, next) => {
    // using Joi Validation middleware
    const {error} = employeeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map( el => el.message).join(',');
        throw new  ExpressError(msg, 400);
    }
    else {
        next();
    }
} 