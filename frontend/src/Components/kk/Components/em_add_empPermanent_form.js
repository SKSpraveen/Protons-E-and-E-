import '../css/em_add_emp_form.css'
import * as React from 'react';
import { Box, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addEmployee_permanent } from '../api/addEmployeePermanentDataApi';



const Em_add_empPermanent_form = () =>{
    const[name, setName] = React.useState(''); 
    const[nic, setNic] = React.useState(); 
    const[age, setAge] = React.useState(); 
    const[email, setEmail] = React.useState(''); 
    const[wNumber, setWnumber] = React.useState(); 
    const[cNumber, setCnumber] = React.useState();
    const [type, setType] = React.useState('permanent');
    const[password, setPassword] = React.useState('');  

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/empTable');
    };

    const handleSubmit2 = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        addEmployee_permanent({
            name: name,
            nic: nic,
            age: age,
            email: email,
            wNumber: wNumber,
            cNumber: cNumber,
            type:type,
            password: password
        });

        navigate('/empTable');
    
    };

    

    return(
        <Box>
<div  style={{marginTop:'50px'}}className="container">
            <h1 className='form_head' ><i>Add Permanent</i></h1>
            <br />

            <form className="row g-3" >
        <div className="col-10">
            <label for="inputName"  style={{color:'#000000'}} className="form-label">Name</label>
            <Input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
         <div className="col-10">
            <label for="inputItem"  style={{color:'#000000'}} className="form-label">NIC</label>
            <Input type="text" className="form-control" id="nic" value={nic} onChange={(e) => setNic(e.target.value)}/>
        </div>
        <div className="col-10">
            <label for="inputDescription"  style={{color:'#000000'}} className="form-label">Age</label>
            <Input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
        </div>
        <div className="col-10">
            <label for="inputPhoto"  style={{color:'#000000'}} className="form-label">Email</label>
            <Input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="col-md-5" style={{marginLeft:"4%"}}>
            <label for="inputDiscount"  style={{color:'#000000'}} className="form-label">Whatsapp Number</label>
            <Input type="phone" className="form-control" id="wNumber" value={wNumber} onChange={(e) => setWnumber(e.target.value)}/>
        </div>
        <div className="col-md-5">
            <label for="inputOldPrice"  style={{color:'#000000'}} className="form-label">Contact Number</label>
            <Input type="phone" className="form-control" id="cNumber" value={cNumber} onChange={(e) => setCnumber(e.target.value)}/>
        </div>
        <div className="col-10">
            <label for="inputNewPrice"  style={{color:'#000000'}} className="form-label">Password</label>
            <Input type="password" className="form-control" id="inputNewPrice" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
       
        <div className="col-md-5" style={{marginLeft:"4%"}}>
            <button type="button" className="btn btn-primary"onClick={handleSubmit2}>ADD</button>
        </div>

        <div className="col-md-5">
            <button type="submit" className="btn btn-primary" onClick={cancel}>Cancel</button>
        </div>
    </form>
    <br />
        </div>

</Box>
    )
}


export default Em_add_empPermanent_form;