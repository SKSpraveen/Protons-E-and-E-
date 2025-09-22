const Employee_attendance_data ={};
const Employee_attendance_data = require('../controller/con_employee_attendance');


Employee_attendance_data.getEmployee_attendance = (res) => {
    controller.getEmployee_attendance((data) => {
        res.send(data);
    });
};

Employee_attendance_data.addEmployee_attendance =(req,res) =>{
    controller.addEmployee_attendance(req.body,()=>{
        res.send("Attendance added");
    });;
};

Employee_attendance_data.updateEmployee_attendance =(req, res) => {
    controller.updateEmployee_attendance(req.body, () => {
        res.send("Employee updated successfully");
    });
};

Employee_attendance_data.deleteEmployee_attendance = (req, res) => {
    controller.deleteEmployee_attendance(req.body, () => {
        res.send("Employee deleted successfully");
    });
};

module.exports = Employee_attendance_data;