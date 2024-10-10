import React from 'react'
import { useNavigate } from "react-router-dom";
import profile from '../../assets/img/Feed/profile_img.svg'

const Mypage = () => {
    const navigate = useNavigate();
    const clickCommuLike=()=>{
        navigate("/CommuLike")
    }
    return (
        <div className='mypage_wrap'>
            <div className="header">
                <p>마이페이지</p>
            </div>
            <div className="profile_div">
                <img src={profile} alt="" />
                <p className="name">닉네임</p>
            </div>
            <hr />
            <div className="view_wrap">
                <p className="title">최근 방문</p>
                <div className="view_div">
                    <div className="view_list">커뮤니티</div>
                    <div className="view_list">캘린더</div>
                </div>
            </div>
            <div className="history">
                <p className="title">나의 기록</p>
                <div className="history_div">
                    <img src={profile} alt="" className="icon" />
                    <p className="history_title">관심 관람 목록</p>
                </div>
                <div className="history_div" onClick={clickCommuLike}>
                    <img src={profile} alt="" className="icon" />
                    <p className="history_title">관심 커뮤니티 목록</p>
                </div>
                <div className="history_div">
                    <img src={profile} alt="" className="icon" />
                    <p className="history_title">댓글 이력</p>
                </div>
            </div>
            <hr />
            <div className="profile_setting">
                <p className="title">계정 설정</p>
                <div className="history_div">
                    <img src={profile} alt="" className="icon" />
                    <p className="history_title">관심 관람 목록</p>
                </div>
            </div>
        </div>

    )
}

export default Mypage