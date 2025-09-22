import '../../Components/kk/css/em_add_emp_form.css';
import * as React from 'react';
import { Box, Button, Input } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateEmployee_intern } from '../../Components/kk/api/addEmployeeInternDataApi';

const Emp_edit_InternForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = React.useState(true);
    const [employeeData, setEmployeeData] = React.useState(null);

    React.useEffect(() => {
        if (state && state.employeeData) {
            setEmployeeData(state.employeeData);
            setLoading(false);
        }
    }, [state]);

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to update the employee data
            await updateEmployee_intern(employeeData);
            // Redirect to the profile page after successful update
            navigate('/profile_kk', { state: { employeeData } });
        } catch (error) {
            console.error('Error updating employee data:', error);
        }
    };
    if (loading) {
        return <div>Loading...</div>; // or any loading indicator
    }
    return(
        <Box className='body1'>
<div className="container">
           

            <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-10">
            <label for="inputName" className="form-label">Name</label>
            <Input type="text" className="form-control" id="name" value={employeeData ? employeeData.name : ''}  onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}/>
        </div>
         <div className="col-10">
            <label for="inputItem" className="form-label">NIC</label>
            <Input type="text" className="form-control" id="nic" value={employeeData ? employeeData.nic : ''} onChange={(e) => setEmployeeData({ ...employeeData, nic: e.target.value })}/>
        </div>
        <div className="col-10">
            <label for="inputDescription" className="form-label">Age</label>
            <Input type="number" className="form-control" id="age" value={employeeData ? employeeData.age : ''} onChange={(e) => setEmployeeData({ ...employeeData, age: e.target.value })}/>
        </div>
        <div className="col-10">
            <label for="inputPhoto" className="form-label">Email</label>
            <Input type="email" className="form-control" id="email" value={employeeData ? employeeData.email : ''} onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}/>
        </div>
        <div className="col-md-5" style={{marginLeft:"4%"}}>
            <label for="inputDiscount" className="form-label">Whatsapp Number</label>
            <Input type="phone" className="form-control" id="wNumber" value={employeeData ? employeeData.wNumber : ''} onChange={(e) => setEmployeeData({ ...employeeData, wNumber: e.target.value })}/>
        </div>
        <div className="col-md-5">
            <label for="inputOldPrice" className="form-label">Contact Number</label>
            <Input type="phone" className="form-control" id="cNumber" value={employeeData ? employeeData.cNumber : ''} onChange={(e) => setEmployeeData({ ...employeeData, cNumber: e.target.value })}/>
        </div>
        <div className="col-10">
            <label for="inputNewPrice" className="form-label">Password</label>
            <Input type="password" className="form-control" id="inputNewPrice" value={employeeData ? employeeData.password : ''} onChange={(e) => setEmployeeData({ ...employeeData, password: e.target.value })}/>
        </div>
       
        <div className="col-md-5" style={{marginLeft:"4%"}}>
            <button type="submit" className="btn btn-primary">ADD</button>
        </div>

        <div className="col-md-5">
            <button type="button" className="btn btn-primary" onClick={()=> navigate('/profile_kk', { state: { employeeData }})}>Cancel</button>
        </div>
    </form>
    <br />
        </div>

</Box>
    )
}


export default Emp_edit_InternForm;