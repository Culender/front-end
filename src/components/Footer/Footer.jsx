import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BeforeIcon1 from "../../assets/img/Footer/Icon1.svg";
import BeforeIcon2 from "../../assets/img/Footer/Icon2.svg";
import BeforeIcon3 from "../../assets/img/Footer/Icon3.svg";
import BeforeIcon4 from "../../assets/img/Footer/Icon4.svg";
import BeforeIcon5 from "../../assets/img/Footer/Icon5.svg";
import AfterIcon1 from "../../assets/img/Footer/Icon11.svg";
import AfterIcon2 from "../../assets/img/Footer/Icon22.svg";
import AfterIcon3 from "../../assets/img/Footer/Icon33.svg";
import AfterIcon4 from "../../assets/img/Footer/Icon44.svg";
import AfterIcon5 from "../../assets/img/Footer/Icon55.svg";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleIconClick = (iconName, path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src={location.pathname === '/home' ? AfterIcon1 : BeforeIcon1}
          alt="Icon 1"
          className="icon"
          onClick={() => handleIconClick('icon1', '/home')}
        />
        
        <img
          src={location.pathname === '/calendar' ? AfterIcon2 : BeforeIcon2}
          alt="Icon 2"
          className="icon"
          onClick={() => handleIconClick('icon2', '/calendar')}
        />

        <img
          src={location.pathname === '/record' ? AfterIcon3 : BeforeIcon3}
          alt="Icon 3"
          className="icon"
          onClick={() => handleIconClick('icon3', '/record')}
        />
        
        <img
          src={location.pathname === '/community' ? AfterIcon4 : BeforeIcon4}
          alt="Icon 4"
          className="icon"
          onClick={() => handleIconClick('icon4', '/community')}
        />
        
        <img
          src={location.pathname === '/profile' ? AfterIcon5 : BeforeIcon5}
          alt="Icon 5"
          className="icon"
          onClick={() => handleIconClick('icon5', '/profile')}
        />
      </div>
    </footer>
  );
};

export default Footer;
