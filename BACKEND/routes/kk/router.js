const express = require('express');
const router = express.Router();
const controller_intern = require('../../models/kk/controller/con_employee_intern_data');
const controller_permanent = require('../../models/kk/controller/con_employee_permanent_data');
const controller_salary = require('../../models/kk/controller/con_employee_intern_salary');
const controller_attendance = require('../../models/kk/controller/con_employee_attendance');
const controller_final_att = require('../../models/kk/controller/con_employee_intern_final_att');


router.get('/getEmployee_intern', controller_intern.getEmployee_intern);
router.post('/addEmployee_intern', controller_intern.addEmployee_intern);
router.post('/updateEmployee_intern', controller_intern.updateEmployee_intern);
router.delete('/deleteEmployee_intern/:nic', controller_intern.deleteEmployee_intern);
router.get('/getEmployeeById_intern/:nic', controller_intern.getEmployeeById_intern);


router.get('/getEmployee_permanent', controller_permanent.getEmployee_permanent);
router.post('/addEmployee_permanent', controller_permanent.addEmployee_permanent);
router.post('/updateEmployee_permanent', controller_permanent.updateEmployee_permanent);
router.delete('/deleteEmployee_permanent/:nic', controller_permanent.deleteEmployee_permanent);


router.get('/getEmployee_salary', controller_salary.getEmployee_salary);
router.post('/addEmployee_salary', controller_salary.addEmployee_salary);
router.post('/updateEmployee_salary', controller_salary.updateEmployee_salary);
router.delete('/deleteEmployee_salary/:nic/:month', controller_salary.deleteEmployee_salary);

router.get('/getEmployee_attendance', controller_attendance.getEmployee_attendance);
router.post('/addEmployee_attendance', controller_attendance.addEmployee_attendance);
router.post('/updateEmployee_attendance', controller_attendance.updateEmployee_attendance);
router.delete('/deleteEmployee_attendance', controller_attendance.deleteEmployee_attendance);


router.get('/getEmployee_intern_final_att', controller_final_att.getEmployee_final_att);
router.post('/addEmployee_intern_final_att', controller_final_att.addEmployee_final_att);
router.delete('/deleteEmployee_intern_final_att', controller_final_att.deleteEmployee_final_att);

module.exports = router;