import React from 'react'
import { useNavigate } from "react-router-dom";
import search from '../../assets/img/community/search_icon.svg'
import heart from '../../assets/img/Feed/heart.svg'
import comment from '../../assets/img/Feed/comment.svg'

const Commu = () => {
    const navigate = useNavigate();
    const clickDetail=()=>{
        navigate("/CommuDetail")
    }
    const clickAdd=()=>{
        navigate("/CommuAdd")
    }
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
                <div className="total">전체</div>
                <div className="event">이벤트</div>
                <div className="mate">직관메이트</div>
            </div>
            <div className="contents_div">
                <div className="contents" onClick={clickDetail}>
                    <p className="type">인기글</p>
                    <p className="text">[직관 메이트]구해요</p>
                    <hr />
                    <div className="info">
                        <img src={heart} alt="" className="heart" />
                        <p className="heart_num">10</p>
                        <img src={comment} alt="" className="comment" />
                        <p className="comment_num">10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commu