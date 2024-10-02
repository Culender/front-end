import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = (event) => {
    event.preventDefault(); 
    // 로그인 로직 작성
    navigate('/feed'); 
  };

  return (
    <div className="login_wrap container">
      <div className="logo">
        {/* 로고 이미지 삽입 */}
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="userId">아이디</label>
          <input type="text" id="userId" placeholder="아이디를 입력해주세요" />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      <div className="signup-link">
        <a href="/signup">회원가입하기</a>
      </div>
    </div>
  );
}

export default Login;
