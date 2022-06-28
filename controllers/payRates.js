const payroll = require('../models/payroll');
const hr = require('../models/hr')
const PayRates = require('../models/payrates');
const Employee = require('../models/employees');

const { employeeSchema } = require('../schema');

module.exports.index = async (req, res) => {
    const payrates = await payroll.getPayRates();
    res.render('payRates/index', { data: payrates });
}

module.exports.detail = async (req, res) => {
    const {id} = req.params; 
    try {
        const payrate = await PayRates.findOne({idPayRates:id});

        res.render('payRates/detail', {payrate});
    }
    catch(e){
        return res.redirect('/payrates');
    }
}

module.exports.createForm = async (req, res) => {
    res.render('payRates/new');
}

module.exports.editForm = async (req, res) => {
    const {id} = req.params;
    
    try {
        const payrate = await PayRates.find({idPayRates:id});

        res.render('payRates/edit', {payrate : payrate[0]});
    }
    catch(e){
        return res.redirect('/payrates');
    }
}

module.exports.create = async (req, res) => {
    const { payrate } = req.body;

    try {
        const payrates = new PayRates(payrate);
        await payrates.save();
        const addPayrate = await payroll.addPayrate(payrate);
        req.flash('success', 'Sucessful make a pay rates!!');
        res.redirect('/payrates');
    }
    catch (err) {
        console.log(err);
        res.redirect('/payrates/new')
    }
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    try {
        const payrate = await PayRates.findOneAndUpdate({idPayRates:id}, req.body.payrate);
        await payrate.save();
        const editPayrate = await payroll.updatePayrate(req.body.payrate);
        req.flash('success', 'Success updated pay rate!');
        res.redirect(`/payrates`);
    }
    catch (err) {
        console.log(err);
        res.redirect(`/payrates/${id}/edit`)
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const employess = await Employee.find({idEmployee:id});
    if (employess.length > 0) {
        req.flash('error', 'Cant delete pay rates, constrain foreignkey!');
        return res.redirect(`/payrates/${id}`);
    }
    const payrate = await PayRates.findOneAndDelete({idPayRates:id});
    const deletePayrate = await payroll.deletePayrate(id);
    req.flash('success', 'Successfully delete pay rates!');
    res.redirect('/payrates');
}