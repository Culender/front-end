import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import profile_img from '../../assets/img/Feed/profile_img.svg'
import heart from '../../assets/img/Feed/heart.svg'
import comment from '../../assets/img/Feed/comment.svg'
import logo from '../../assets/img/Feed/logo.svg'
import axios from 'axios';

const Feed = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const clickDetail=()=>{
        navigate("/Detail")
    }
    useEffect(() => {
        // API 호출 함수
        const fetchRecords = async () => {
            try {
                const token = 'your_jwt_token_here'; // JWT 토큰을 여기에 설정하세요
                const response = await axios.get('http://3.36.209.83:8080/api/record/getRecentRecord', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setRecords(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch records:', error);
            }
        };

        fetchRecords();
    }, []);
    return (
        <div className='feed_wrap' >
            <div className="header">
                <img src={logo} alt="" />
            </div>
            {records.map(record => (
                <div key={record.recordId} className="contents_div" onClick={clickDetail}>
                    <div className="content_top_div">
                        <div>
                            <img src={record.profileImg || profile_img} alt="" className="profile" />
                            <p className="name">{record.nickname}</p>
                        </div>
                        <div className="follow">팔로우</div>
                    </div>
                    <img src={record.image} alt="" className="content_img" />
                    <div className="info_div">
                        <img src={heart} alt="" className="heart" />
                        <p className="heart_count">{record.likeCount}</p>
                        <img src={comment} alt="" className="comment" />
                        <p className="comment_count">{record.commentCount}</p>
                    </div>
                    <div className="text_div">
                        <p className="text_title">{record.title}</p>
                        <p className="text_review">{record.content}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Feed