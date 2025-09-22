import React, {useState, useEffect} from "react";
import axios from "axios";
import RequestTable from "./RequestTable";



function ShuttleDetails(){
  const [ShuttleRequests, setShuttleRequests] = useState([]);

    
    useEffect(() =>{
        function getRequests(){
            axios.get("http://localhost:8070/ShuttleRequest").then((res) => {
               
            setShuttleRequests(res.data);
            }).catch((err)=> {alert(err.message);
            })
        }
        getRequests();
    },[])




  useEffect(() => {
    axios.get("http://localhost:8070/ShuttleRequest")
      .then((res) => {
        setShuttleRequests(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="container">
      <h1>Request Details</h1>
      <RequestTable rows={ShuttleRequests} />
    </div>
  );
};

export default ShuttleDetails;
