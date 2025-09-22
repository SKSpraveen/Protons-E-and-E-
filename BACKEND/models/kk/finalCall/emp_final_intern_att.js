const Empolyee_intern_final_att={};
const Empolyee_intern_final_att = require('../controller/con_employee_intern_final_att');



Empolyee_intern_final_att.getEmployee_final_att = (res) => {
    controller.getEmployee_final_att((data) => {
        res.send(data);
    });
};

Empolyee_intern_final_att.addEmployee_final_att =(req,res) =>{
    controller.addEmployee_final_att(req.body,()=>{
        res.send("Attendance added");
    });;
};

Empolyee_intern_final_att.deleteEmployee_final_att = (req, res) => {
    controller.deleteEmployee_final_att(req.body, () => {
        res.send("Employee deleted successfully");
    });
};

module.exports = Empolyee_intern_final_att;