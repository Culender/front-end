import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://3.36.209.83:8080/api/user/signIn', {
        loginId: loginId,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('전체 응답 데이터:', response.data);

        const accessToken = response.data.accessToken || response.data.data?.accessToken;
        console.log('추출된 accessToken:', accessToken);

        try {
          localStorage.setItem('test', 'value');
          if (localStorage.getItem('test') === 'value') {
            console.log('로컬 스토리지 접근 성공');
          }

          setTimeout(() => {
            localStorage.setItem('token', accessToken);
            console.log('토큰 저장 성공:', accessToken);
          }, 100);

          navigate('/feed');
        } catch (e) {
          console.error('로컬 스토리지 저장 오류:', e);
        }
      } 
    } catch (error) {
      if (error.response) {
        console.error('응답 오류 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);

        alert('로그인 실패: 아이디나 비밀번호를 확인해주세요.');
      } else {
        console.error('네트워크 오류:', error.message);
      }
    }
  };

  return (
    <div className="login_wrap container">
      <div className="logo">
        {/* 로고 이미지 삽입 */}
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            placeholder="아이디를 입력해주세요"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
