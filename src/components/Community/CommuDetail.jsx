import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import profile_img from '../../assets/img/Feed/profile_img.svg'
import heart from '../../assets/img/Feed/heart.svg'
import empty_heart from '../../assets/img/Feed/empty_heart.svg';
import comment from '../../assets/img/Feed/comment.svg'
import back from '../../assets/img/Feed/back.svg'
import send from '../../assets/img/Feed/send.svg'
import axios from 'axios';

const CommuDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onClickBack = () => {
    navigate(-1);
  };

  const fetchPostDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      const postId = location.state?.postId;

      if (!token || !postId) {
        console.error('토큰 또는 게시글 ID가 존재하지 않습니다.');
        return;
      }

      const response = await axios.get(`http://3.36.209.83:8080/api/post/getPost?postId=${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch post details:', error);
    }
  };
  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const postId = location.state?.postId;

      if (!token || !postId) {
        console.error('토큰 또는 게시글 ID가 존재하지 않습니다.');
        return;
      }

      const response = await axios.get(`http://3.36.209.83:8080/api/postComment/getCommentsByPost?postId=${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
    fetchComments();
  }, []);

  const handleLikeToggle = async () => {
    if (!post) return;
    const token = localStorage.getItem('token');
    const postId = location.state?.postId;
    if (!token || !postId) return;

    try {
      const url = post.isLiked
        ? `http://3.36.209.83:8080/api/postLike/unlike?postId=${postId}`
        : `http://3.36.209.83:8080/api/postLike/like?postId=${postId}`;

      const response = await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // 좋아요 상태 변경 및 새로고침
        await fetchPostDetail();
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const postId = location.state?.postId;
      if (!token || !postId) return;

      const response = await axios.post('http://3.36.209.83:8080/api/postComment/createComment', {
        postId: postId,
        content: newComment
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setNewComment(''); // 입력 필드 초기화
        // 댓글 목록 및 게시글 정보를 다시 불러오기
        await fetchPostDetail();
        await fetchComments();
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='commu_detail_wrap'>
      <div className="header">
        <img src={back} alt="" className="back" onClick={onClickBack} />
      </div>
      <div className="type">{post.category}</div>
      <p className="title">{post.title}</p>
      <p className="contents">{post.content}</p>
      <div className="info_div">
        <img
          src={post.isLiked ? heart : empty_heart}
          alt="Like Icon"
          className="heart"
          onClick={handleLikeToggle}
        />
        <p className="heart_count">{post.likeCount}</p>
        <img src={comment} alt="" className="comment" />
        <p className="comment_count">{post.commentCount}</p>
      </div>
      <hr />
      <div className="comment_div">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="content_top_div">
              <img src={comment.profileImg || profile_img} alt="" className="profile" />
              <p className="name">{comment.nickname}</p>
              <p className="text">{comment.content}</p>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        <div className="bottom"></div>
      </div>
      <div className="add_comment_div">
        <input
          type="text"
          className="add_comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <img src={send} alt="" className="send" onClick={handleAddComment} />
      </div>
    </div>
  )
}

export default CommuDetail