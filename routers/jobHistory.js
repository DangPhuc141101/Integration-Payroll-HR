const express = require('express');
const router = express.Router();
const jobHistory = require('../controllers/jobHistory');
const {validatePayrate, validateEmployee} = require('../middleware');

router.route('/')
    .get(jobHistory.index)
    .post(jobHistory.create)

router.route('/new')
    .get(jobHistory.createForm)

router.route('/:id')
    .get(jobHistory.detail)
    .put(jobHistory.edit)
    .delete(jobHistory.delete)

router.route('/:id/edit')
    .get(jobHistory.editForm)
    
module.exports = router;