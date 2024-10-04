import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [selectedIcon, setSelectedIcon] = useState(''); 
  const navigate = useNavigate(); 

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);

    if (iconName === 'icon2') {
      navigate('/calendar'); 
    } else if (iconName === 'icon3') {
      navigate('/record'); 
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src={selectedIcon === 'icon1' ? AfterIcon1 : BeforeIcon1}
          alt="Icon 1"
          className="icon"
          onClick={() => handleIconClick('icon1')}
        />
        
        <img
          src={selectedIcon === 'icon2' ? AfterIcon2 : BeforeIcon2}
          alt="Icon 2"
          className="icon"
          onClick={() => handleIconClick('icon2')}
        />

        <img
          src={selectedIcon === 'icon3' ? AfterIcon3 : BeforeIcon3}
          alt="Icon 3"
          className="icon"
          onClick={() => handleIconClick('icon3')} 
        />
        
        <img
          src={selectedIcon === 'icon4' ? AfterIcon4 : BeforeIcon4}
          alt="Icon 4"
          className="icon"
          onClick={() => handleIconClick('icon4')}
        />
        
        <img
          src={selectedIcon === 'icon5' ? AfterIcon5 : BeforeIcon5}
          alt="Icon 5"
          className="icon"
          onClick={() => handleIconClick('icon5')}
        />
      </div>
    </footer>
  );
};

export default Footer;
