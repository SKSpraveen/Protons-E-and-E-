import React from 'react';
import userImage from '../../Images/user.png';
import pencilImage from '../../Images/pencil.png';
import deleteImage from '../../Images/delete.png';
import Footer from '../../Components/Footer';
import './userTable.css';

const UsersTable = ({ rows, selectedUser, deleteUser, fname }) => {

  const renderStars = (count) => {
    let stars = [];
    for (let index = 0; index < 5; index++) {
      stars.push(<span key={index} className={index < count ? 'selected' : ''}>&#9733;</span>);
    }
    return stars;
  };

  const handleEditClick = (row) => {
    selectedUser({
      id: row.id,
      service: row.service,
      fname: row.fname,
      feedback: row.feedback,
      selectedStarCount: row.selectedStarCount,
    });
  };

  const handleDeleteClick = (id) => {
    deleteUser({ id });
  };

  return (
    <div>
     
      <div className="cardnuw-container">
        {rows.map((row, index) => (
          <div className="cardnuw" key={index}>
            <div className="user-detailsnuww">
              <img src={userImage} alt="User" />
              <div className="username">
                <h5><b>{row.fname}</b></h5> 
              </div>
            </div>
            <div className="cardnuw-content">   
              <p className="service">Service Type: {row.service}</p><br></br>

              <div className="rating">
                {renderStars(row.selectedStarCount)}
              </div>

              <div className="feedback">
                <p className="feed">{row.feedback}</p>
              </div><br></br>
            </div>
            <div className="cardnuw-icons">
              <button className="icon-link" onClick={() => handleEditClick(row)} aria-label="Edit">
                <img className="pencil-icon" src={pencilImage} alt="Edit" />
              </button>
              <button className="icon-link" onClick={() => handleDeleteClick(row.id)} aria-label="Delete">
                <img className="bin-icon" src={deleteImage} alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default UsersTable;
