const Employee = require('../models/employees');
const hr = require('../models/hr');
const connectMongo = require('../config/connectMongo');
connectMongo();

const employeeToPerson = async() => {
    const employees = await Employee.find();
    for (let employee of employees)
    {
        const addEmployee = await hr.addPersonal(employee);
    }
}

employeeToPerson()