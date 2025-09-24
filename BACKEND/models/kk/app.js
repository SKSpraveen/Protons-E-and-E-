const express = require("express");
const app = express();
const cors = require("cors");
const Emp_intern_data = require('./finalCall/emp_intern_data')
const Emp_permanent_data = require('./finalCall/emp_permanent_data')
const Emp_salary = require('./finalCall/emp_salary')
const Employee_attendance_data = require('./finalCall/emp_attendance')
const Empolyee_intern_final_att = require('./finalCall/emp_final_intern_att')



app.use(cors());





app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/getEmployee_intern', Emp_intern_data.getEmployeeIntern);
app.post('/addEmployee_intern', Emp_intern_data.addEmployeeIntern);
app.post('/updateEmployee_intern', Emp_intern_data.updateEmployeeIntern);
app.delete('/deleteEmployee_intern/:nic', Emp_intern_data.deleteEmployeeIntern);
app.get('/getEmployeeById_intern/:nic', Emp_intern_data.getEmployeeById_intern);


app.get('/getEmployee_permanent', Emp_permanent_data.getEmployee_permanent);
app.post('/addEmployee_permanent', Emp_permanent_data.addEmployee_permanent);
app.post('/updateEmployee_permanent', Emp_permanent_data.updateEmployee_permanent);
app.delete('/deleteEmployee_permanent/:nic', Emp_permanent_data.deleteEmployee_permanent);

app.get('/getEmployee_salary', Emp_salary.getEmployee_salary);
app.post('/addEmployee_salary', Emp_salary.addEmployee_salary);
app.post('/updateEmployee_salary', Emp_salary.updateEmployee_salary);
app.delete('/deleteEmployee_salary/:nic/:month', Emp_salary.deleteEmployee_salary);


app.get('/getEmployee_attendance', Employee_attendance_data.getEmployee_attendance);
app.post('/addEmployee_attendance', Employee_attendance_data.addEmployee_attendance);
app.post('/updateEmployee_attendance', Employee_attendance_data.updateEmployee_attendance);
app.delete('/deleteEmployee_attendance', Employee_attendance_data.deleteEmployee_attendance);


app.get('/getEmployee_intern_final_att', Empolyee_intern_final_att.getEmployee_final_att);
app.post('/addEmployee_intern_final_att', Empolyee_intern_final_att.addEmployee_final_att);
app.delete('/deleteEmployee_intern_final_att', Empolyee_intern_final_att.deleteEmployee_final_att);


module.exports = app;
