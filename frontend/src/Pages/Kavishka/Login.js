import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useLogin } from "../../hooks/useLogin";
import image from '../../Images/Kavishka/cctv2.jpg'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
            <h2 style={{ color: "black", textAlign: "center", marginBottom: "30px" }}>Login</h2>
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
                  }}
                />
              </div>
              <span className="text-danger">{error}</span>
              <br />
              <a href="" className="Forgot" style={{ color: "#000000" }}>
                Forgot password?{" "}
              </a>
              <br />
              <br />
              <button
                style={{ backgroundColor: "orange", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%" }}
                type="submit"
                className="signup-button l4"
                id="login"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Login
              </button>
              <p style={{ textAlign: "center" }}>
                Don't have an account?
                <a href="" onClick={() => navigate("/signup")} className="" style={{ color: "blue" }}>
                  Sign up
                </a>
              </p>
              <button onClick={() => navigate("/Stafflogin")} style={{ textAlign: "center", borderRadius: "0px 0px 10px", marginLeft: "250px" }}>
                Staff Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <Footer />

    </div>
  );
}

export default Login;
