const mongoose = require('mongoose');
const { DateTime } = require('mssql');

const jobHistorySchema = new mongoose.Schema({
    jobHistoryID: {
        type: Number,
        unique: true
    },
    employeeId: Number,
    department: String,
    division: String,
    startDate: Date,
    endDate: Date,
    jobTitle: String,
    supervisor: Number,
    jobCategory: String,
    location : String,
    departmentCode : Number,
    salaryType : Number,
    payPeriod : String,
    hoursPerWeek : Number,
    hazardousTraining : Boolean,

}
)

module.exports = mongoose.model('JobHistory', jobHistorySchema);