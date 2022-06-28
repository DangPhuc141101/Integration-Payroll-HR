const mySqlDB = require('../config/connectMySQL');

const addEmployee = (data, result) => {
    const sqlSelectEmployee = 'INSERT INTO employee SET ?';
    mySqlDB.query(sqlSelectEmployee, data, (err, res) => {
        if (err) {
            console.log(error);
            result(null);
            return;
        }
        result(res.insertId, ...data);
    });
}

const lastNames = ['Nhat', 'Chinh', 'Dao'];
const fistNames = ['Nguyen', 'Ngo', 'Che', 'Truong'];
const createEmployee = () => {
    const data = {
        Employee_Number: 1002,
        idEmployee: 2,
        Last_Name: 'Dao',
        First_Name: 'Nguyen',
        SSN: 401287954,
        Pay_Rate: '3.33',
        PayRates_id: 2,
        Vacation_Days: 10,
        Paid_To_Date: 99,
        Paid_Last_Year: 99
      }
      addEmployee(data, (id) => {
          const msg = ( id ? 'sucess' : 'fail');
          console.log(msg);
      });
}