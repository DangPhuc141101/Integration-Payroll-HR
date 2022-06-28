const express = require('express');
const router = express.Router();
const employees = require('../controllers/employees');
const { validateEmployee } = require('../middleware');

router.route('/')
    .get(employees.index)
    .post(validateEmployee, employees.create)

router.route('/new')
    .get(employees.createForm)

router.route('/:id')
    .get(employees.detail)
    .put(employees.edit)
    .delete(employees.delete)

router.route('/:id/edit')
    .get(employees.editForm)
module.exports = router;