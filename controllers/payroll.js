const payroll = require('../models/payroll');
const human = require('../models/hr');
const Employee = require('../models/employees');
const Payrate = require('../models/payrates');
const JobHistory = require('../models/jobHistory');
const amount = async (employees, department) => {
    const amountByDepartment = {};
    amountByDepartment['department'] = department;
    amountByDepartment['amount'] = 0;
    for (let employee of employees) {
        const amount = await payroll.getAmount(employee['Employee_ID'].toString());
        if (amount) amountByDepartment['amount'] += parseFloat(amount['Pay_Rate']) * amount['Pay_Amount'];
    }
    return amountByDepartment;
}

const getShareholderEarning = async () => {
    try {
        const persons = await human.getPersonal();

        const amountByShareholder = [];
        for (const person of persons) {

            const { Employee_ID, Shareholder_Status } = person;
            const shareholder = (Shareholder_Status) ? "Shareholder" : "Not Shareholder";
            const payrates = await payroll.getAmount(Employee_ID.toString());
            let amountTemp = 0;
            if (payrates) amountTemp = parseFloat(payrates['Pay_Rate']) * payrates['Pay_Amount'];

            const amount_by_shareholder = amountByShareholder.find(
                element => element[shareholder] !== undefined
            );

            if (amount_by_shareholder) amount_by_shareholder[shareholder] += amountTemp;
            else amountByShareholder.push({ [shareholder]: amountTemp })
        }

        return amountByShareholder;
    }
    catch (e) {
        console.log(e)
    }
}

const getTotalVacationShareholder = async () => {
    try {
        const persons = await human.getPersonal();
        const vaticatonShareholder = [];
        for (const person of persons) {
            const { Employee_ID, Shareholder_Status } = person;
            const shareholder = (Shareholder_Status) ? "Shareholder" : "Not Shareholder";

            let totalValication = 0;
            const employee = await payroll.getEmployee_1(Employee_ID);

            if (employee) totalValication += parseInt(employee[0]['Vacation_Days']);

            const totalVaticationShareholder = vaticatonShareholder.find(
                element => element[shareholder] !== undefined
            );

            if (totalVaticationShareholder) totalVaticationShareholder[shareholder] += totalValication;
            else vaticatonShareholder.push({ [shareholder]: totalValication })
        }
        return vaticatonShareholder;
    } catch (error) {

    }
}

module.exports.amount = async (_req, res) => {
    try {
        const employees_mongo = await Employee.find();
        const payrates = await Payrate.find();
        const jobHistories = await JobHistory.find();
        let departments = await human.getDepartment();
        const listAmountByDepartment = [];
        for (let department of departments) {
            const employees = await human.getEmployeeID(department);
            const getAmount = await amount(employees, department);
            listAmountByDepartment.push(getAmount);
        }

        const vacationDayByShareholder = await getTotalVacationShareholder();
        const result1 = vacationDayByShareholder.map(element => ({ shareholder: Object.keys(element)[0], vacation: element[Object.keys(element)[0]] }));
        const earningByShareholder = await getShareholderEarning();
        const result3 = earningByShareholder.map(element => ({ shareholder: Object.keys(element)[0], earning: element[Object.keys(element)[0]] }));
        res.render('index', { myData: listAmountByDepartment, vacationDayByShareholder: result1, earningByShareholder: result3, employees:employees_mongo, payrates, jobHistories});
    } catch (err) {

    }


}