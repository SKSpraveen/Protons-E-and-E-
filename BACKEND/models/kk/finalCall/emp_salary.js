const emp_salary = {};
const emp_salary = require('../controller/con_employee_intern_salary');


emp_salary.getEmployee_salary =  (req, res) => {
    controller.getEmployee_salary((data) => {
        res.send(data); // Sending data received from the controller
    });
};

emp_salary.addEmployee_salary = (req, res) => {
    controller.addEmployee_salary(req.body, () => {
        res.send("Salary added successfully");
    });
};

emp_salary.updateEmployee_salary =(req, res) => {
    controller.updateEmployee_salary(req.body, () => {
        res.send("Salary updated successfully");
    });
};

emp_salary.deleteEmployee_salary = (req, res) => {
    controller.deleteEmployee_salary(req.body, () => {
        res.send("Salary deleted successfully");
    });
};




module.exports = emp_salary;
