import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Modal from "react-modal";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [newData, setNewData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (user) {
      Axios.get(`http://localhost:8070/api/auth/profile/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          setUserData(res.data);
          setNewData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirmUpdate = async (e) => {
    e.preventDefault();
    setShowModal(false);

    // Basic validation checks
    if (!newData.name || !newData.address || !newData.phoneNumber) {
      setValidationError("All fields are required");
      return;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(newData.phoneNumber)) {
      setValidationError("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      await Axios.put(
        `http://localhost:8070/api/auth/update/${user.email}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserData(newData);
      setValidationError("");
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await Axios.delete(
        `http://localhost:8070/api/auth/delete/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      logout();
      navigate("/login");
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div style={{ background: "linear-gradient(to bottom, #ffc490, #f3f5ff)", display: "flex", fontFamily: "Arial, sans-serif" }}>
      <div
        className="sidebar"
        style={{
          backgroundColor: "#242424",
          color: "white",
          width: "300px",
          height: "100vh",
          padding: "20px",
        }}
      >
        <ul className="menu" style={{ listStyleType: "none", padding: 0 }}>
          <div style={{ background: "black", borderRadius: "20px 0px 20px 0px", height: "50px", paddingTop: "9px", fontWeight: "bold" }}>
            <li style={{ marginBottom: "10px", fontSize: "25px", color: "white", textDecoration: "none", marginLeft: "20%" }}>
              USER PANEL
            </li>
          </div>
          <br />
          <br />
          <li style={{ marginBottom: "10px", fontSize: "25px" }}>
            <button type="button" onClick={()=> navigate('/')} style={{ border: "none", backgroundColor: "#242424", color: "white", textDecoration: "none", marginLeft: "20%" }}>
              Feedback
            </button>
          </li>
          <br />
          <li style={{ marginBottom: "10px", fontSize: "25px" }}>
            <button type="button" onClick={()=> navigate('/UserviewTable')} style={{ border: "none", backgroundColor: "#242424", color: "white", textDecoration: "none", marginLeft: "20%" }}>
              Complaint
            </button>
          </li>
          <br />
          <li style={{ marginBottom: "10px", fontSize: "25px" }}>
            <button type="button" style={{ border: "none", backgroundColor: "#242424", color: "white", textDecoration: "none", marginLeft: "20%" }}>
              My Orders
            </button>
          </li>
          <br />
          <li style={{ marginBottom: "10px", fontSize: "25px" }}>
            <button type="button" onClick={()=> navigate('/UserviewTable')} style={{ border: "none", backgroundColor: "#242424", color: "white", textDecoration: "none", marginLeft: "20%" }}>
              My Services
            </button>
          </li>
          <br />
          <li>
            <button
              className="logout-button"
              onClick={handleLogout}
              style={{
                marginLeft: "20%",
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "20px",
                marginTop: "190px"
              }}
            >
              <i class="fa fa-sign-out" aria-hidden="true"></i>&ensp;Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="admin-container" style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: "0 0 30px rgba(32, 32, 32, 0.5)" }}>
        <header className="admin-header" style={{ backgroundColor: 'rgba(255, 74, 2, 0.816)', display: 'flex', color: 'black', padding: '20px', alignItems: 'center', width: "calc(100% - 0px)" }}>
          <h1 style={{ color: 'black', margin: "auto", fontWeight: "600" }}> User Profile</h1>
        </header>
        <div className="profile-container" style={{ padding: "20px", backgroundColor: "#f4f4f4", marginTop: "80px", width: "50%", border: "1px solid #ccc", borderRadius: "5px", position: "relative" }}>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label htmlFor="email" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label htmlFor="address" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label htmlFor="phoneNumber" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
              }}
            />
                      {validationError && <div style={{ color: "red", marginBottom: "10px" }}>{validationError}</div>}

          </div>
          <div style={{ textAlign: "right", width: "100%" }}>
            <button
              type="button"
              className="update-button"
              onClick={handleUpdate}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Update
            </button>
            <button
              className="delete-button"
              onClick={handleDelete}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              },
            }}
          >
            <h2>Edit User Data</h2>
            <form onSubmit={handleConfirmUpdate}>
              <div style={{ marginBottom: "20px", width: "100%" }}>
                <label htmlFor="name" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px", width: "100%" }}>
                <label htmlFor="address" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newData.address}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px", width: "100%" }}>
                <label htmlFor="phoneNumber" style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newData.phoneNumber}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ textAlign: "right", width: "100%" }}>
                <button
                  type="submit"
                  className="update-button"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
