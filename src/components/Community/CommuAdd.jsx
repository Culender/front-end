import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import back from '../../assets/img/Feed/back.svg'
import axios from 'axios';

const CommuAdd = () => {
    const [category, setCategory] = useState('event');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('토큰이 존재하지 않습니다.');
                return;
            }

            const formData = new FormData();
            formData.append('category', category);
            formData.append('title', title);
            formData.append('content', content);

            const response = await axios.post('http://3.36.209.83:8080/api/post/createPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert('게시글이 성공적으로 등록되었습니다.');
                navigate(-1); // 이전 페이지로 이동
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className='commu_add_wrap'>
            <div className="header">
                <img src={back} alt="" className="back" onClick={onClickBack} />
                <p className="title">커뮤니티 글쓰기</p>
            </div>
            <select
                name="type"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="event">이벤트</option>
                <option value="info_share">정보공유</option>
                <option value="mate">직관메이트</option>
            </select>
            <div className="notion">
                <p className="title">안내</p>
                <p className="text">다른 목적의 글은 올리실 수 없어요</p>
            </div>
            <input
                type="text"
                placeholder='제목을 입력하세요'
                className='commu_title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                className='commu_text'
                placeholder='본문 내용을 입력하세요'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="done" onClick={handleSubmit}>완료</div>
        </div>
    )
}

export default CommuAdd