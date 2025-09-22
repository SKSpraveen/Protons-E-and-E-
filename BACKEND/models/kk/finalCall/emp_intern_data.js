const emp_intern_data = {};
const emp_intern_data = require('../controller/con_employee_intern_data');


emp_intern_data.getEmployee_intern =  (req, res) => {
    controller.getEmployee_intern((data) => {
        res.send(data); // Sending data received from the controller
    });
};

emp_intern_data.addEmployee_intern = (req, res) => {
    controller.addEmployee_intern(req.body, () => {
        res.send("Employee added successfully");
    });
};

emp_intern_data.updateEmployee_intern =(req, res) => {
    controller.updateEmployee_intern(req.body, () => {
        res.send("Employee updated successfully");
    });
};

emp_intern_data.deleteEmployee_intern = (req, res) => {
    controller.deleteEmployee_intern(req.body, () => {
        res.send("Employee deleted successfully");
    });
};

emp_intern_data.getEmployeeById_intern = (req, res) => {
    controller.getEmployeeById_intern(req, res); // Corrected
};


module.exports = emp_intern_data;
