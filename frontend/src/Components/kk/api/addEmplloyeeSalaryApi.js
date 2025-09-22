import Axios from 'axios';


export const getEmployee_salary = () => {
  return Axios.get('http://localhost:8070/api/getEmployee_salary')
    .then(response => response.data?.response || [])
    .catch(error => {
      console.error("Axios error:", error);
      throw error;
    });
};



export const addEmployee_salary = (data) => {
    const payload = {
        name: data.name,
        nic: data.nic,
        email: data.email,
        type: data.type,
        salary: data.salary,
        month:data.month,
    };
  
    return Axios.post('http://localhost:8070/api/addEmployee_salary', payload)
      .catch(error => {
        console.error("Axios error:", error);
        throw error;
      });
  };
 


export const deleteEmployee_salary = async (nic,month) => {
  try {
      await Axios.delete(`http://localhost:8070/api/deleteEmployee_salary/${nic}/${month}`);
      return { status: "Employee deleted" };
  } catch (error) {
      console.error("Axios error:", error);
      throw error;
  }
};
 

export const updateEmployee_salary = async (data) => {
  try {
      // Send a POST request to the backend API endpoint for updating employee data
      const response = await Axios.post('http://localhost:8070/api/updateEmployee_salary', data);
      return response.data; // Return the response data
  } catch (error) {
      console.error("Axios error:", error);
      throw error;
  }
};
