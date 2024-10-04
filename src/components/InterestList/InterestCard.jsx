import React from 'react';

const InterestCard = ({ title, description, location, date }) => {
  return (
    <div className="interest-card">
      <div className="card-image">사진</div>
      <div className="card-content">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="info">
          <span>{location}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default InterestCard;
