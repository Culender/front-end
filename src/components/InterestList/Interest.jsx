import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/img/Login/back.svg';
import InterestCard from './InterestCard';
import axios from 'axios';

const Interest = () => {
  const [likedRecords, setLikedRecords] = useState([]);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);



  const fetchLikedRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('토큰이 존재하지 않습니다.');
        return;
      }

      const response = await axios.get('http://3.36.209.83:8080/api/record/getLikedRecords', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setLikedRecords(response.data.data || []); // 데이터가 없을 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error('Failed to fetch liked records:', error);
    }
  };

  useEffect(() => {
    fetchLikedRecords();
  }, []);

  return (
    <div className="interest-wrap container">
      <div className="header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="뒤로가기" />
          <span className="back-text">관심 관람 목록</span>
        </button>
      </div>

      <div className="interest-list" >
        {likedRecords.length > 0 ? (
          likedRecords.map((item, index) => (
            <InterestCard
              key={item.recordId} // React가 요소를 식별하기 위해 사용하는 key
              recordId={item.recordId} // 명시적으로 recordId를 props로 전달
              title={item.title}
              description={item.content}
              location={item.place}
              date={item.date}
              image={item.image}
            />
          ))
        ) : (
          <p className='no'>관심 관람 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Interest;
