import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import search from '../../assets/img/community/search_icon.svg'
import heart from '../../assets/img/Feed/heart.svg'
import empty_heart from '../../assets/img/Feed/empty_heart.svg';
import comment from '../../assets/img/Feed/comment.svg'
import axios from 'axios';

const Commu = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const navigate = useNavigate();
    const clickDetail=(postId)=>{
        navigate("/CommuDetail", { state: { postId } })
    }
    const clickAdd=(postId)=>{
        navigate("/CommuAdd")
    }

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('토큰이 존재하지 않습니다.');
                return;
            }

            const response = await axios.get('http://3.36.209.83:8080/api/post/getAllPosts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setPosts(response.data.data);
                setFilteredPosts(response.data.data); // 초기값은 전체 게시글로 설정
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === "전체") {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => post.category === category);
            setFilteredPosts(filtered);
        }
    };
    const getCategoryStyle = (category) => {
        return category === selectedCategory
            ? { borderBottom: '3px solid #0066FF' }
            : { borderBottom: 'none' };
    };

    return (
        <div className='commu_wrap'>
            <div className="header">
                <p>커뮤니티</p>
            </div>
            <div className="top">
                <select className='choice'>
                    <option value="title">제목</option>
                    <option value="contents">내용</option>
                </select>
                <div className="search_div">
                    <input type="text" />
                    <img src={search} alt="" />
                </div>
            </div>
            <div className="menu">
                <div className="total">전체글</div>
                <div className="add" onClick={clickAdd}>글쓰기</div>
            </div>
            <hr />
            <div className="type">
                <div 
                    className="total" 
                    onClick={() => handleCategoryClick("전체")}
                    style={getCategoryStyle("전체")}
                >
                    전체
                </div>
                <div 
                    className="event" 
                    onClick={() => handleCategoryClick("이벤트")}
                    style={getCategoryStyle("이벤트")}
                >
                    이벤트
                </div>
                <div 
                    className="info_share" 
                    onClick={() => handleCategoryClick("정보공유")}
                    style={getCategoryStyle("정보공유")}
                >
                    정보공유
                </div>
                <div 
                    className="mate" 
                    onClick={() => handleCategoryClick("직관메이트")}
                    style={getCategoryStyle("직관메이트")}
                >
                    직관메이트
                </div>
            </div>
            <div className="contents_div">
            {filteredPosts.map(post => (
                    <div key={post.postId} className="contents" onClick={() => clickDetail(post.postId)}>
                        <p className="type">{post.category}</p>
                        <p className="text">{post.title}</p>
                        <hr />
                        <div className="info">
                            <img 
                                src={post.isLiked ? heart : empty_heart} 
                                alt="Like Icon" 
                                className="heart" 
                            />
                            <p className="heart_num">{post.likeCount}</p>
                            <img src={comment} alt="" className="comment" />
                            <p className="comment_num">{post.commentCount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Commu