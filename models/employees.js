const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    employeeNumber :{
        type: Number,
        unique: true
    },
    idEmployee : {
        type: Number,
        unique: true
    },
    lastName : String,
    firstName : String,
    ssn : Number,
    payRate : Number,
    payRateId : Number,
    vacationDay : Number,
    paidToDay : Number,
    paidLastYear : Number,
    middleInitial : String,
    address1 : String,
    address2 : String,
    city : String,
    state : String,
    zip : Number,
    email : String,
    phoneNumber : String,
    socialSecurityNumber : String,
    driversLicense : String,
    maritalStatus : String,
    gender : Boolean,
    shareholderStatus : Boolean,
    benefitPlans : Number,
    ethnicity : String
})  

const employees = mongoose.model('employees', employeeSchema);
module.exports = employees;