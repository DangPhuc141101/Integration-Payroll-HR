const payroll = require('../models/payroll');
const hr = require('../models/hr')
const JobHistory = require('../models/jobHistory');

module.exports.index = async (req, res) => {
    const jobHistory = await hr.getJobHistory();
    res.render('jobHistory/index', { jobHistory });
}

module.exports.detail = async(req, res) => {
    const { id } = req.params;
 
    try {
        const jobHistory = await JobHistory.findOne({jobHistoryID:id});
        const startDate = formatDate(jobHistory.startDate);
        const endDate = formatDate(jobHistory.endDate);
        
        res.render('jobHistory/detail', {jobHistory, startDate, endDate});
    }
    catch(e){
        console.log(e, 'something wrong')
        return res.redirect('/job-history');
    }
}

module.exports.createForm = async (req, res) => {
    const employees = await payroll.getEmployee();
    res.render('jobHistory/new', {employees});
}

const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0'), mm = String(date.getMonth() + 1).padStart(2, '0'), yyyy = date.getFullYear();
    const result = yyyy + '-' + mm + '-' + dd;
    return result
}
module.exports.editForm = async (req, res) => {
    const { id } = req.params;
 
    try {
        const jobHistory = await JobHistory.findOne({jobHistoryID:id});
        const startDate = formatDate(jobHistory.startDate);
        const endDate = formatDate(jobHistory.endDate);
        
        const employees = await payroll.getEmployee();
        res.render('jobHistory/edit', {employees, jobHistory, startDate, endDate});
    }
    catch(e){
        console.log(e, 'something wrong')
        return res.redirect('/job-history');
    }
}

module.exports.create = async (req, res) => {
    const { jobHistory } = req.body;

    try {
        const createJobHistoryHR = await hr.addJobHistory(jobHistory);
        const {MaxID} = await hr.getMaxIDJobHistory();
        console.log(MaxID)
        const jobHis = new JobHistory({...jobHistory, hazardousTraining : (jobHistory.hazardousTraining ? true : false), jobHistoryID:MaxID});
        await jobHis.save();
        req.flash('success', 'Successfully made a new job history!');
        res.redirect('/job-history');
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Error ID job history already exist!');
        res.redirect('/job-history/new')
    }
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const { jobHistory } = req.body;
    try {
        const jobHis = await JobHistory.findOneAndUpdate({jobHistoryID:id}, {...jobHistory, hazardousTraining : (jobHistory.hazardousTraining ? true : false)});
        await jobHis.save();
        const editJobHistoryHR = await hr.updateJobHistory(jobHistory);
        req.flash('success', 'Successfully updated job history!');
        res.redirect(`/job-history`);
    }
    catch (err) {
        console.log(err);
        res.redirect(`/job-history/${id}/edit`)
    }
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const jobHistory = await JobHistory.findOneAndDelete({jobHistoryID:id})
    const deleteJobHistory = await hr.deleteJobHistory(id)
    req.flash('success', 'Successfully delete job history!');
    res.redirect('/job-history');
}