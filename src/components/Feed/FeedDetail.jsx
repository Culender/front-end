import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import profile_img from '../../assets/img/Feed/profile_img.svg'
import heart from '../../assets/img/Feed/heart.svg'
import empty_heart from '../../assets/img/Feed/empty_heart.svg'
import comment from '../../assets/img/Feed/comment.svg'
import back from '../../assets/img/Feed/back.svg'
import send from '../../assets/img/Feed/send.svg'
import axios from 'axios';

const FeedDetail = () => {
    const [record, setRecord] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const onClickBack = () => {
        navigate(-1);
    };

    const fetchRecordDetail = async (recordId, token) => {
        try {
            const response = await axios.get(`http://3.36.209.83:8080/api/record/getRecord?recordId=${recordId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setRecord(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch record details:', error);
        }
    };

    const fetchComments = async (recordId, token) => {
        try {
            const commentResponse = await axios.get(`http://3.36.209.83:8080/api/recordComment/getRecordCommentList?recordId=${recordId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (commentResponse.status === 200 && commentResponse.data.data) {
                setComments(commentResponse.data.data);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
                if (!token) {
                    console.error('토큰이 존재하지 않습니다.');
                    return;
                }

                const recordId = location.state?.recordId;
                if (!recordId) {
                    console.error('recordId가 전달되지 않았습니다.');
                    return;
                }

                // 관람 기록 상세 정보 가져오기
                await fetchRecordDetail(recordId, token);

                // 댓글 정보 가져오기
                await fetchComments(recordId, token);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [location.state]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const recordId = location.state?.recordId;
            if (!token || !recordId) return;

            const response = await axios.post('http://3.36.209.83:8080/api/recordComment/createRecordComment', {
                recordId: recordId,
                comment: newComment
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setNewComment(''); // 입력 필드 초기화
                // 댓글 목록 및 관람 기록 정보를 다시 불러오기
                await fetchRecordDetail(recordId, token);
                await fetchComments(recordId, token);
            }
        } catch (error) {
            console.error('Failed to add comment:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            }
        }
    };
    const handleLikeToggle = async () => {
        if (!record) return;
        const token = localStorage.getItem('token');
        const recordId = location.state?.recordId;
        if (!token || !recordId) return;

        try {
            const url = record.isLiked
                ? `http://3.36.209.83:8080/api/recordLike/unlike?recordId=${recordId}`
                : `http://3.36.209.83:8080/api/recordLike/like?recordId=${recordId}`;

            const response = await axios.post(url, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // 좋아요 상태 변경 및 새로고침
                await fetchRecordDetail(recordId, token);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    if (!record) {
        return <div>Loading...</div>;
    }

    return (
        <div className='feed_detail_wrap' >
            <div className="header">
                <img src={back} onClick={onClickBack} alt="" className="back" />
            </div>
            <div className="contents_div">
                <div className="content_top_div">
                    <div>
                        <img src={profile_img} alt="" className="profile" />
                        <p className="name">{record.nickname}</p>
                    </div>
                </div>
                <img src={record.image} alt="" className="content_img" />
                <div className="info_div">
                    <img
                        src={record.isLiked ? heart : empty_heart}
                        alt="Like Icon"
                        className="heart"
                        onClick={handleLikeToggle}
                    />
                    <p className="heart_count">{record.likeCount}</p>
                    <img src={comment} alt="" className="comment" />
                    <p className="comment_count">{record.commentCount}</p>
                </div>
                <div className="text_div">
                    <p className="text_writer">{record.nickname}</p>
                    <div>
                        <p className="text_title">{record.title}</p>
                        <p className="text_when">{record.date}</p>
                    </div>
                    <p className="text_review">{record.content}</p>
                </div>
            </div>
            <div className="comment_div">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="content_top_div">
                            <img src={comment.profileImg || profile_img} alt="" className="profile" />
                            <p className="name">{comment.nickname}</p>
                            <p className="text">{comment.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
                <div className="bottom"></div>
            </div>

            <div className="add_comment_div">
                <input type="text" className="add_comment" value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요" />
                <img src={send} alt="" className="send" onClick={handleAddComment} />
            </div>
        </div>
    )
}

export default FeedDetail