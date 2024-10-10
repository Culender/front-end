import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../assets/img/Calender/left.svg';
import RightArrow from '../../assets/img/Calender/right.svg';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  const handleMonthChange = (direction) => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const renderHeader = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.toLocaleString('ko-KR', { month: 'long' });

    return (
      <div className="calendar-header">
        <button className="month-button" onClick={() => handleMonthChange(-1)}>
          <img src={LeftArrow} alt="Previous month" />
        </button>
        <h2>{`${year} ${month}`}</h2>
        <button className="month-button" onClick={() => handleMonthChange(1)}>
          <img src={RightArrow} alt="Next month" />
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => (
    <div className="days-row">
      {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
        <div key={index} className="day-of-week">{day}</div>
      ))}
    </div>
  );

  const renderDates = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const dates = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
      return (
        <div key={i + 1} className={`date ${isHighlightedDate(date) ? 'highlighted' : ''}`}>
          {i + 1}
        </div>
      );
    });

    const paddingDays = firstDayOfMonth.getDay() - 1 < 0 ? 6 : firstDayOfMonth.getDay() - 1;
    const paddedDates = Array.from({ length: paddingDays }, (_, i) => (
      <div key={`padded-${i}`} className="empty-date"></div>
    ));

    return (
      <div className="dates-grid">
        {paddedDates}
        {dates}
      </div>
    );
  };

  const isHighlightedDate = (date) => {
    const highlightedDates = ['2024-09-06', '2024-09-11', '2024-09-16', '2024-09-26'];
    return highlightedDates.includes(date.toISOString().split('T')[0]);
  };

  return (
    <div className="calendar_wrap container">
      <div className="calendar-header-section">
        <h1>캘린더</h1>
        <button className="add-button" onClick={() => navigate('/record')}>일정추가</button>
      </div>
      {renderHeader()}
      <div className="line-separator"></div>
      {renderDaysOfWeek()}
      {renderDates()}
    </div>
  );
};

export default Calendar;
