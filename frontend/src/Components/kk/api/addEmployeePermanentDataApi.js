import Axios from "axios";


export const getEmployee_permanent = () => {
  return Axios.get('http://localhost:8070/api/getEmployee_permanent')
    .then(response => response.data?.response || [])
    .catch(error => {
      console.error("Axios error:", error);
      throw error;
    });
};




export const addEmployee_permanent = (data) => {
    const payload = {
        name: data.name,
        nic: data.nic,
        age: data.age,
        email: data.email,
        wNumber: data.wNumber,
        cNumber: data.cNumber,
        password: data.password,
    };
  
    return Axios.post('http://localhost:8070/api/addEmployee_permanent', payload)
      .catch(error => {
        console.error("Axios error:", error);
        throw error;
      });
  };

  export const deleteEmployee_permanent = async (nic) => {
    try {
        await Axios.delete(`http://localhost:8070/api/deleteEmployee_permanent/${nic}`);
        return { status: "Employee deleted" };
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
  };

  export const updateEmployee_permanent = async (data) => {
    try {
        // Send a POST request to the backend API endpoint for updating employee data
        const response = await Axios.post('http://localhost:8070/api/updateEmployee_permanent', data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
  };