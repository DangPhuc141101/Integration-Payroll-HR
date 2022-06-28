const express = require('express');
const router = express.Router();
const payRates = require('../controllers/payRates');
const {validatePayrate, validateEmployee} = require('../middleware');

router.route('/')
    .get(payRates.index)
    .post(validatePayrate, payRates.create)

router.route('/new')
    .get(payRates.createForm)

router.route('/:id')
    .get(payRates.detail)
    .put(validatePayrate, payRates.edit)
    .delete(payRates.delete)

router.route('/:id/edit')
    .get(payRates.editForm)
module.exports = router;