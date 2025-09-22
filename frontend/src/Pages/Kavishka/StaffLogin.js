import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import image from '../../Images/Kavishka/staff.jpg'

const StaffLogin2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email and password
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8070/api/auth/staff");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const newData = await response.json();
      console.log('new data', newData); // Check the structure of newData

      // Check email and password against fetched data
      const user = newData.find(row => row.email === email && row.password === password);
      if (user) {
        console.log('role', user.role);
        // Redirect based on user's role
        switch (user.role) {
          case "Admin":
            navigate("/Admin");
            break;
          case "Stock Manager":
            console.log('Done');
            navigate("/smdashboard");
            break;

            case "Employee Manager":
                
                navigate("/dashboard");
                break;
            case "Financial Manager":
                  
                  navigate("/home");
                  break;
            case "transportation Manager":
                  
                  navigate("/transportation");
                  break;
            case "Payment Manager":
                  
                   navigate("/omdashboard");
                  break;
          // Add more cases for other roles as needed
          default:
            navigate("/default_dashboard");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Failed to fetch data");
    }
  };

  return (
    <div>
      <Header />
      <div className="signup-container" style={{ display: "flex" }}>
        <div className="image-container" style={{ flex: "1", backgroundColor: "#f2f2f2", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
          <img src={image} alt="Security Camera" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
        </div>
        <div className="form-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", width: "40%", backgroundColor: 'white', boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
          <div className="signup-content" style={{ padding: "30px", borderRadius: "10px", width: "100%", maxWidth: "400px" }}>
            <h2 style={{ color: "black", textAlign: "center", marginBottom: "30px" }}>Staff Login</h2>
            <form>
              <div className="input-group l3" style={{ marginBottom: "20px" }}>
                <input
                  placeholder="Email"
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="input-group l3" style={{ marginBottom: "20px" }}>
                <input
                  placeholder="Password"
                  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                  type="password"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
              {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
              <button
                style={{ backgroundColor: "orange", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" }}
                type="submit"
                className="signup-button l4"
                id="login"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <Footer />
    </div>
  )
};

export default StaffLogin2;
