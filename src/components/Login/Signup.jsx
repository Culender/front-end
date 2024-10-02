import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/img/Login/back.svg'; 

const InputField = ({ id, label, placeholder, type = "text" }) => (
  <div className="input-group">
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} />
  </div>
);

const Signup = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate(); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 작성
    navigate('/login');
  };

  const handleBackClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="signup-wrap container">
      <div className="header">
        <button className="back-button" onClick={handleBackClick}>
          <img src={backIcon} alt="뒤로가기" />
          <span className="back-text">회원가입</span>
        </button>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="profile-image">
          <label htmlFor="profileUpload">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-preview" />
            ) : (
              <div className="image-placeholder" />
            )}
            <span className="upload-icon">+</span>
          </label>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        <InputField id="name" label="이름" placeholder="이름을 입력해주세요" />
        <InputField id="userId" label="아이디" placeholder="아이디를 입력해주세요" />
        <InputField id="password" label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
        <InputField id="nickname" label="닉네임" placeholder="닉네임을 입력해주세요" />
        <InputField id="contact" label="연락처" placeholder="연락처를 입력해주세요" />

        <button type="submit" className="signup-button">완료</button>
      </form>
    </div>
  );
};

export default Signup;

