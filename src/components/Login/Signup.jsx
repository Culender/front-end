import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backIcon from '../../assets/img/Login/back.svg';

const InputField = ({ id, label, placeholder, type = "text", value, onChange }) => (
  <div className="input-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    password: '',
    nickname: '',
    phone: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('loginId', formData.loginId);
    form.append('password', formData.password);
    form.append('name', formData.name);
    form.append('nickname', formData.nickname);
    form.append('phone', formData.phone);
    if (profileImage) {
      form.append('profileImg', profileImage);
    }

    try {
      const response = await axios.post('http://3.36.209.83:8080/api/user/signUp', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('회원가입 성공:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
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
              <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-preview" />
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

        <InputField
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          id="loginId"
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={formData.loginId}
          onChange={handleChange}
        />
        <InputField
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={formData.nickname}
          onChange={handleChange}
        />
        <InputField
          id="phone"
          label="연락처"
          placeholder="연락처를 입력해주세요"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit" className="signup-button">완료</button>
      </form>
    </div>
  );
};

export default Signup;
