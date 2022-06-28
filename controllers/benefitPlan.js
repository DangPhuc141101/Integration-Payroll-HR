const hr = require('../models/hr')
const BenefitPlan = require('../models/benefitPlans');
const Employee = require('../models/employees');

module.exports.index = async (req, res) => {
    const benefitPlans = await hr.getBenefitPlans();
    res.render('benefitPlan/index', { benefitPlans });
}

module.exports.detail = async(req, res) => {
    const {id} = req.params; 
   
    try {
        const benefitPlan = await BenefitPlan.findOne({benefitPlanID: id});
        res.render('benefitPlan/detail', {benefitPlan});
    }
    catch(e){
        return res.redirect('/benefitPlan');
    }
}
module.exports.createForm = async (req, res) => {
    res.render('benefitPlan/new');
}

module.exports.editForm = async (req, res) => {
    const {id} = req.params; 
    const benefitPlan = await BenefitPlan.findOne({benefitPlanID: id});
    try {
        res.render('benefitPlan/edit', {benefitPlan});
    }
    catch(e){
        return res.redirect('/benefitPlan');
    }
}

module.exports.create = async (req, res) => {
    const { benefitPlan } = req.body;

    try {
        const addBenefitPlanHR = await hr.addBenefitPlan(benefitPlan);
        const {MaxID} = await hr.getMaxIDBenefitPlan();
        const benefit = new BenefitPlan({...benefitPlan, benefitPlanID:MaxID});
        benefit.save();
        req.flash('success', 'Create a benefit Success!')
        res.redirect('/benefit-plan');
    }
    catch (err) {
        console.log(err, "error create");
        res.redirect('/benefit-plan/new')
    }
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    try {
        const benefit = await BenefitPlan.findOneAndUpdate({benefitPlanID: id}, req.body.benefitPlan);
        await benefit.save();
        const editBenefitPlan = await hr.updateBenefitPlan(req.body.benefitPlan);
        res.flash('success', 'Update success benefit plan')
        res.redirect(`/benefit-plan`);
    }
    catch (err) {
        console.log(err);
        res.redirect(`/benefit-plan/${id}/edit`)
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const employees = await Employee.find({benefitPlans:id});
    if (employees.length)  {
        req.flash('error', 'Cant delete this benefit, exist employ have this benefit plan!')
        return res.redirect(`/benefit-plan/${id}`);
    }
    const benefit = await BenefitPlan.findOneAndDelete({benefitPlanID: id});
    const deleteBenefitPlan = await hr.deleteBenefitPlan(id);
    res.redirect('/benefit-plan');
}