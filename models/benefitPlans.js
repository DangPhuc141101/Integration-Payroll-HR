const mongoose = require('mongoose');

const benefitPlan = new mongoose.Schema({
    benefitPlanID: {
        type: Number,
        unique: true
    },
    planName: String,
    deductable: Number,
    percentageCoPay: Number
})

module.exports = mongoose.model('benefitplans', benefitPlan);