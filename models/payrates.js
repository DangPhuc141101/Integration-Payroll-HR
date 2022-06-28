const mongoose = require('mongoose');

const payrateSchema = new mongoose.Schema({
    idPayRates: {
        type: Number,
        unique: true
    },
    payRateName: String,
    value: Number,
    taxPercentage: Number,
    payType: Number,
    payAmount: Number,
    PTLevelC: Number
}
)

module.exports = mongoose.model('Payrates', payrateSchema);