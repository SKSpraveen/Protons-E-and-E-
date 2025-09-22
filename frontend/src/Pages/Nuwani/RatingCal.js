import React from 'react';
import './userTable.css';

const RatingCal = ({ totalCardContainers, ratingsCount }) => {

    const renderStars = (count) => {
        let stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<span key={i} style={{ color: 'orange' }}>&#9733;</span>);
        }
        return stars;
    };
    return (
      <div>
       
        <div className="cardnuw-container">
       
            <div className="cardnuw">
              <div className="user-detailsnuww">
               
                <div className="username">
                  <h5><b>Total Ratings: {totalCardContainers}</b></h5>
                  
                  <p>{renderStars(5)}: {ratingsCount.count5Star}</p>
                  <p>{renderStars(4)}: {ratingsCount.count4Star}</p>
                  <p>{renderStars(3)}: {ratingsCount.count3Star}</p>
                  <p>{renderStars(2)}:{ratingsCount.count2Star}</p>
                </div>
              </div>
            </div>
          
        </div>
       
      </div>
    );
  }
  
  export default RatingCal;
