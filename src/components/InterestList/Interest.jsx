import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/img/Login/back.svg';
import InterestCard from './InterestCard';

const Interest = () => {
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <div className="interest-wrap container">
      <div className="header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="뒤로가기" />
          <span className="back-text">관심 관람 목록</span>
        </button>
      </div>

      <div className="interest-list">
        {[
          { title: '제목 1', description: '내용 1', location: '장소 1', date: '날짜 1' },
          { title: '제목 2', description: '내용 2', location: '장소 2', date: '날짜 2' },
          { title: '제목 3', description: '내용 3', location: '장소 3', date: '날짜 3' },
          { title: '제목 1', description: '내용 1', location: '장소 1', date: '날짜 1' },
          { title: '제목 2', description: '내용 2', location: '장소 2', date: '날짜 2' },
          { title: '제목 3', description: '내용 3', location: '장소 3', date: '날짜 3' },
          { title: '제목 1', description: '내용 1', location: '장소 1', date: '날짜 1' },
          { title: '제목 2', description: '내용 2', location: '장소 2', date: '날짜 2' },
          { title: '제목 3', description: '내용 3', location: '장소 3', date: '날짜 3' },
        ].map((item, index) => (
          <InterestCard
            key={index}
            title={item.title}
            description={item.description}
            location={item.location}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Interest;
