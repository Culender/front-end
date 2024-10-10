import React from 'react';
import { useNavigate } from 'react-router-dom';

const InterestCard = ({recordId, title, description, location, date, image }) => {
  const navigate = useNavigate();
  const clickDetail = (recordId) => {
    navigate("/Detail", { state: { recordId } });
  }
  return (
    <div className="interest-card" onClick={() => clickDetail(recordId)}>
      <div className="card-image">
        <img src={image} alt="" />
      </div>
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
