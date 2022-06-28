const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers){
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension);

module.exports.payrateSchema = Joi.object({
    payrate: Joi.object({
        idPayRates: Joi.number().required(),
        payRateName: Joi.string(). required().escapeHTML(),
        value: Joi.number().required().min(0).max(9999999999),
        taxPercentage: Joi.number().required().min(0).max(9999999999),
        payType: Joi.number().required().min(0).max(9999999999),
        payAmount: Joi.number().required().min(0).max(9999999999),
        PTLevelC: Joi.number().required().min(0).max(9999999999),
    }).required()
})

module.exports.employeeSchema = Joi.object({
    employee: Joi.object({
        employeeNumber : Joi.number().required().min(0),
        idEmployee : Joi.number().required().min(0),
        lastName : Joi.string().required().escapeHTML(),
        firstName : Joi.string().required().escapeHTML(),
        ssn : Joi.number().required().min(0),
        payRate : Joi.number().required(),
        payRateId : Joi.number().required(),
        vacationDay : Joi.number().required(),
        paidToDay : Joi.number().required().min(0).max(99),
        paidLastYear : Joi.number().required().min(0).max(99),
        middleInitial : Joi.string().required().escapeHTML(),
        address1 : Joi.string().required().escapeHTML(),
        address2 : Joi.string().required().escapeHTML(),
        city : Joi.string().required().escapeHTML(),
        state : Joi.string().required().escapeHTML(),
        zip : Joi.number().required(),
        email : Joi.string().required().escapeHTML(),
        phoneNumber : Joi.string().required().escapeHTML(),
        socialSecurityNumber : Joi.string().required().escapeHTML(),
        driversLicense : Joi.string().required().escapeHTML(),
        maritalStatus : Joi.string().required().escapeHTML(),
        gender : Boolean,
        shareholderStatus : Boolean,
        benefitPlans : Joi.number().required(),
        ethnicity : Joi.string(). required().escapeHTML()
    }).required()
})