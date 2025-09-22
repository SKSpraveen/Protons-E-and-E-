const emp_permanent_data = {};


emp_permanent_data.getEmployee_permanent =  (req, res) => {
    controller.getEmployee_permanent((data) => {
        res.send(data); // Sending data received from the controller
    });
};

emp_permanent_data.addEmployee_permanent = (req, res) => {
    controller.addEmployee_permanent(req.body, () => {
        res.send("Employee added successfully");
    });
};

emp_permanent_data.updateEmployee_permanent =(req, res) => {
    controller.updateEmployee_permanent(req.body, () => {
        res.send("Employee updated successfully");
    });
};

emp_permanent_data.deleteEmployee_permanent = (req, res) => {
    controller.deleteEmployee_permanent(req.body, () => {
        res.send("Employee deleted successfully");
    });
};

module.exports = emp_permanent_data;
