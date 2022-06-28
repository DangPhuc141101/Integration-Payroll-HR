const mongoose = require('mongoose');
const urlDB = 'mongodb://localhost:27017/payroll-hr';
//process.env.URL_DB || 
console.log(urlDB)

const connectDB = ()=>{
    mongoose.connect(urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("DB connection success!");
    })
    .catch(e =>{
        console.log("DB connection error! ", e);
    })  
} 

module.exports = connectDB;

