const connectMySql = require('../config/connectMySQL');

const payroll = {};

payroll.getEmployee = async() => {
    const sqlEmployee = 'SELECT * FROM employee';
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(sqlEmployee);
    return rows;
}

payroll.getPayRates =async() => {
    const sqlPayrates = 'SELECT * FROM pay_rates';
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(sqlPayrates);
    return rows;
}

payroll.getAmount = async (idEmployee) => {
    const sqlAmount = `SELECT Pay_Rate, Pay_Amount FROM employee, pay_rates WHERE employee.idEmployee = ${parseInt(idEmployee)} AND employee.PayRates_id = pay_rates.idPay_Rates`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(sqlAmount);
    return rows[0];
}

payroll.addPayrate = async(payrate) => {
    const {idPayRates, payRateName, value, taxPercentage, payType, payAmount, PTLevelC} = payrate;
    const values = [idPayRates, payRateName, value, taxPercentage, payType, payAmount, PTLevelC];
    const sqlAmount = `INSERT INTO pay_rates (idPay_Rates, Pay_Rate_Name, Value, Tax_Percentage, Pay_Type, Pay_Amount, PT_Level_C) VALUES(?,?,?,?,?,?,?)`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(sqlAmount, values);
    return rows[0];
}

payroll.updatePayrate = async(payrate) => {
    const {idPayRates, payRateName, value, taxPercentage, payType, payAmount, PTLevelC} = payrate;
    const values = [payRateName, value, taxPercentage, payType, payAmount, PTLevelC, idPayRates];
    console.log(values)
    const sqlAmount = `UPDATE pay_rates SET Pay_Rate_Name = ?, Value = ?, Tax_Percentage = ?, Pay_Type = ?, Pay_Amount = ?, PT_Level_C = ? WHERE idPay_Rates = ?`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(sqlAmount, values);
    return rows[0];
}

payroll.deletePayrate = async(id) => {
    const sqlAmount = `DELETE FROM pay_rates WHERE idPay_Rates = ${id}`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(sqlAmount);
    return rows[0];
}

payroll.addEmployee = async(employee) => {
    const {employeeNumber, idEmployee, lastName, firstName, ssn, payRate, payRateId, vacationDay, paidToDay, paidLastYear} = employee;

    const values = [employeeNumber, idEmployee, lastName, firstName, ssn, payRate, payRateId, vacationDay, paidToDay, paidLastYear];
    const addEmplopyee = `INSERT INTO employee (Employee_Number, idEmployee, Last_Name, First_Name, SSN, Pay_Rate, PayRates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year) VALUES(?,?,?,?,?,?,?,?,?,?)`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(addEmplopyee, values);
    return rows[0];
}

payroll.updateEmployee = async(employee) => {
    const {employeeNumber, idEmployee, lastName, firstName, ssn, payRate, payRateId, vacationDay, paidToDay, paidLastYear} = employee;

    const values = [idEmployee, lastName, firstName, ssn, payRate, payRateId, vacationDay, paidToDay, paidLastYear, employeeNumber];
    const updateEmployee = `UPDATE employee SET idEmployee = ?, Last_Name = ?, First_Name = ?, SSN = ?, Pay_Rate =? , PayRates_id = ?, Vacation_Days = ?, Paid_To_Date = ?, Paid_Last_Year = ? WHERE Employee_Number = ?`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(updateEmployee, values);
    return rows[0];
}

payroll.deleteEmployee = async(id) => {
    const deleteEmployee = `DELETE FROM employee WHERE idEmployee = ${id}`;
    const connection = await connectMySql();
    const [rows, fields] = await connection.execute(deleteEmployee);
    return rows[0];
}

// (async() => {
//     const data = await payroll.getAmount(1);
//     console.log(data)
// })()

module.exports = payroll;