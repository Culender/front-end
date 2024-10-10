import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import back from '../../assets/img/Feed/back.svg'
import heart from '../../assets/img/Feed/heart.svg'
import comment from '../../assets/img/Feed/comment.svg'
import axios from 'axios';

const CommuLike = () => {
    const [likedPosts, setLikedPosts] = useState([]);
    const navigate = useNavigate();
    const fetchLikedPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('토큰이 존재하지 않습니다.');
                return;
            }

            const response = await axios.get('http://3.36.209.83:8080/api/post/getLikedPosts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setLikedPosts(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch liked posts:', error);
        }
    };

    useEffect(() => {
        fetchLikedPosts();
    }, []);

    const clickDetail = (postId) => {
        navigate("/CommuDetail", { state: { postId } });
    };

    const onClickBack = () => {
        navigate(-1);
      };

    return (
        <div className='commu_like_wrap'>
            <div className="header">
                <img src={back} alt="" className="back" onClick={onClickBack} />
                <p className="title">관심 커뮤니티 목록</p>
            </div>
            <div className="contents_div">
            {Array.isArray(likedPosts) && likedPosts.length > 0 ? (
                    likedPosts.map((post) => (
                        <div key={post.postId} className="contents" onClick={() => clickDetail(post.postId)}>
                            <p className="type">{post.nickname}</p>
                            <p className="text">{post.title}</p>
                            <hr />
                            <div className="info">
                                <img src={heart} alt="" className="heart" />
                                <p className="heart_num"></p>
                                <img src={comment} alt="" className="comment" />
                                <p className="comment_num"></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>관심 커뮤니티가 없습니다.</p>
                )}
            </div>
        </div>
    )
}

export default CommuLike