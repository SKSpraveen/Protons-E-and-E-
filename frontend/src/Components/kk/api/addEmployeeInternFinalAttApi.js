import Axios from "axios";

export const getEmployee_intern_final_att = () =>{
    return Axios.get('http://localhost:8070/api/getEmployee_intern_final_att')
    .then(response => response.data?.response||[])
    .catch(error =>{
        console.error("Axios error:",error);
        throw error;
    });
};

export const addEmployee_final_att = (data) => {
    const payload = {
        nic:data.nic,
        name: data.name,
        att:data.att,
        ot:data.ot,
        month:data.month,
    };
  
    return Axios.post('http://localhost:8070/api/addEmployee_intern_final_att', payload)
      .catch(error => {
        console.error("Axios error:", error);
        throw error;
      });
  };

  export const deleteEmployee_final_att = async () => {
    try {
        const response = await Axios.delete('http://localhost:8070/api/deleteEmployee_intern_final_att');
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};