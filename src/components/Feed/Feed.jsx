import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import profile_img from '../../assets/img/Feed/profile_img.svg'
import heart from '../../assets/img/Feed/heart.svg'
import empty_heart from '../../assets/img/Feed/empty_heart.svg'
import comment from '../../assets/img/Feed/comment.svg'
import logo from '../../assets/img/Feed/logo.svg'
import axios from 'axios';

const Feed = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const clickDetail = (recordId) => {
        navigate("/Detail", { state: { recordId } });
    }

    const fetchRecords = async () => {
        try {
            const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
            if (!token) {
                console.error('토큰이 존재하지 않습니다.');
                return;
            }

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

    useEffect(() => {
        // 초기 데이터 로드
        fetchRecords();
    }, []);

    const handleLikeToggle = async (recordId, isLiked) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('토큰이 존재하지 않습니다.');
                return;
            }

            const url = isLiked
                ? `http://3.36.209.83:8080/api/recordLike/unlike?recordId=${recordId}`
                : `http://3.36.209.83:8080/api/recordLike/like?recordId=${recordId}`;

            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // 좋아요 상태 및 likeCount를 업데이트
                const updatedRecords = records.map(record =>
                    record.recordId === recordId
                        ? { ...record, isLiked: !isLiked, likeCount: isLiked ? record.likeCount - 1 : record.likeCount + 1 }
                        : record
                );
                setRecords(updatedRecords);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    return (
        <div className='feed_wrap' >
            <div className="header">
                <img src={logo} alt="" />
            </div>
            {records.map(record => (
                <div key={record.recordId} className="contents_div" onClick={() => clickDetail(record.recordId)}>
                    <div className="content_top_div">
                        <div>
                            <img src={record.profileImg || profile_img} alt="" className="profile" />
                            <p className="name">{record.nickname}</p>
                        </div>
                        <div className="follow">팔로우</div>
                    </div>
                    <img src={record.image} alt="" className="content_img" />
                    <div className="info_div">
                        <img
                            src={record.isLiked ? heart : empty_heart}
                            alt="Like Icon"
                            className="heart"
                            onClick={(e) => {
                                e.stopPropagation(); // 클릭 이벤트 전파 방지
                                handleLikeToggle(record.recordId, record.isLiked);
                            }}
                        />
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