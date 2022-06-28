const payroll = require('../models/payroll');
const Employee = require('../models/employees');
const BenfitPlan = require('../models/benefitPlans');
const JobHistory = require('../models/jobHistory');

const hr = require('../models/hr');
const { redirect } = require('statuses');

module.exports.index = async (req, res) => {
    //const employees = await payroll.getEmployee();
    const employees = await Employee.find();
    res.render('employees/index', { data: employees });
}

module.exports.detail = async (req, res) => {
    const {id} = req.params;
  
    try {
        const employee = await Employee.findOne({idEmployee:id});
        const benefitPlan = await BenfitPlan.findOne({benefitPlanID:employee.benefitPlans})
        res.render('employees/detail', {employee, benefitPlan});
    }
    catch(e){
        console.log(e, "eroor")
        return res.redirect('/employees');
    }
}

module.exports.createForm = async (req, res) => {
    const benefitPlans = await hr.getBenefitPlans();
    const payRates = await payroll.getPayRates();
    res.render('employees/new', {benefitPlans, payRates});
}

module.exports.editForm = async (req, res) => {
    const {id} = req.params;
    const benefitPlans = await hr.getBenefitPlans();
    const payRates = await payroll.getPayRates();
    try {
        const employee = await Employee.findOne({idEmployee:id});

        res.render('employees/edit', {employee, benefitPlans, payRates});
    }
    catch(e){
        console.log(e, "eroor")
        return res.redirect('/employees');
    }
}

module.exports.create = async (req, res) => {
    const { employee } = req.body;
    
    try {
        const emp = new Employee({...employee, gender: (employee.gender === 'True' ? true : false), shareholderStatus : (employee.addPersonalshareholderStatus ? true : false)});
        await emp.save();
        const empPayroll = await payroll.addEmployee(employee);
        const empHR = await hr.addPersonal(employee);
        req.flash('success', 'Successfully made a new employee!');
        res.redirect('/employees');
    }
    catch(err) {
        console.log(err)
        req.flash('err', 'Employee id already exist!');
        res.redirect('/employees/new');
    }
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const { employee } = req.body;
    try {
        const emp = await Employee.findOneAndUpdate({idEmployee:id}, {...employee, gender: (employee.gender === 'True' ? true : false), shareholderStatus : (employee.shareholderStatus ? true : false)});
        await emp.save();
        const editEmployeePayroll = await payroll.updateEmployee(employee);
        const editEmployeeHR = await hr.updatePersonal(employee)
        req.flash('success', 'Success updated employee!');
        res.redirect(`/employees`);
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Error when update employee!');
        res.redirect(`/employees/${id}/edit`)
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const jobHistories = await JobHistory.find({employeeId:id});
    if (jobHistories.length>0) {
        console.log(jobHistories)
        req.flash('error', 'Cant delete employee, constrain foreignkey!');
        return res.redirect(`/employees/${id}`);
    }
    const employee = await Employee.findOneAndDelete({idEmployee:id});
    const deleteEmployee = await payroll.deleteEmployee(id);
    const deletePersonal = await hr.deletePersonal(id);
    req.flash('success', 'Success delete employee!');
    res.redirect('/employees');
}