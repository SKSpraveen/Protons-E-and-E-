import Axios from "axios";

export const getEmployee_attendance = () =>{
    return Axios.get('http://localhost:8070/api/getEmployee_attendance')
    .then(response => response.data?.response||[])
    .catch(error =>{
        console.error("Axios error:",error);
        throw error;
    });
};

export const addEmployee_attendance = (data) => {
    const payload = {
        name: data.name,
        nic: data.nic,
        date: data.date,
        onTime: data.onTime,
        offTime: data.offTime, 
        ot: data.ot,
    };
  
    return Axios.post('http://localhost:8070/api/addEmployee_attendance', payload)
      .catch(error => {
        console.error("Axios error:", error);
        throw error;
      });
  };

  export const updateEmployee_attendance = async (data) => {
    try {
        // Send a POST request to the backend API endpoint for updating employee attendance
        const response = await Axios.post('http://localhost:8070/api/updateEmployee_attendance', data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};




export const deleteEmployee_attendance = async () => {
    try {
        const response = await Axios.delete('http://localhost:8070/api/deleteEmployee_attendance');
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};
