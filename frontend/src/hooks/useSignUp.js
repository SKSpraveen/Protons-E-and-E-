import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate=useNavigate()

  const signUp = async (name,email,address,phoneNumber,password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8070/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name,email,address,phoneNumber,password}),
    });
    
    
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      //if(userType=="admin"){
       // navigate("/admin/dashboard")
     
     alert("Susses")
     // }
      
    }
  };
  return { signUp, isLoading, error };
};
