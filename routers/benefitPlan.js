const express = require('express');
const router = express.Router();
const benefitPlan = require('../controllers/benefitPlan');
const {validatePayrate, validateEmployee} = require('../middleware');

router.route('/')
    .get(benefitPlan.index)
    .post(benefitPlan.create)

router.route('/new')
    .get(benefitPlan.createForm)

router.route('/:id')
    .get(benefitPlan.detail)
    .put(benefitPlan.edit)
    .delete(benefitPlan.delete)

router.route('/:id/edit')
    .get(benefitPlan.editForm)
module.exports = router;