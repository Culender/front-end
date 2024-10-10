import React from 'react'
import { useNavigate } from "react-router-dom";
import profile_img from '../../assets/img/Feed/profile_img.svg'
import heart from '../../assets/img/Feed/heart.svg'
import comment from '../../assets/img/Feed/comment.svg'
import back from '../../assets/img/Feed/back.svg'
import send from '../../assets/img/Feed/send.svg'

const FeedDetail = () => {
    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1);
    };

    return (
        <div className='feed_detail_wrap' >
            <div className="header">
                <img src={back} onClick={onClickBack} alt="" className="back" />
            </div>
            <div className="contents_div">
                <div className="content_top_div">
                    <div>
                        <img src={profile_img} alt="" className="profile" />
                        <p className="name">닉네임</p>
                    </div>
                </div>
                <img src="" alt="" className="content_img" />
                <div className="info_div">
                    <img src={heart} alt="" className="heart" />
                    <p className="heart_count">10</p>
                    <img src={comment} alt="" className="comment" />
                    <p className="comment_count">10</p>
                </div>
                <div className="text_div">
                    <p className="text_writer">작성자 정보</p>
                    <div>
                        <p className="text_title">제목</p>
                        <p className="text_when">날짜</p>
                    </div>
                    <p className="text_review">본문</p>
                </div>
            </div>
            <div className="comment_div">
                <div className="content_top_div">
                    <img src={profile_img} alt="" className="profile" />
                    <p className="name">닉네임</p>
                    <p className="text">댓글 내용</p>
                </div>
                <div className="content_top_div">
                    <img src={profile_img} alt="" className="profile" />
                    <p className="name">닉네임</p>
                    <p className="text">댓글 내용</p>
                </div>
                <div className="content_top_div">
                    <img src={profile_img} alt="" className="profile" />
                    <p className="name">닉네임</p>
                    <p className="text">댓글 내용</p>
                </div>
                <div className="bottom"></div>
            </div>

            <div className="add_comment_div">
                <input type="text" className="add_comment" />
                <img src={send} alt="" className="send" />
            </div>
        </div>
    )
}

export default FeedDetail