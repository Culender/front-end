import React from 'react'
import { useNavigate } from "react-router-dom";
import back from '../../assets/img/Feed/back.svg'
import heart from '../../assets/img/Feed/heart.svg'
import comment from '../../assets/img/Feed/comment.svg'

const CommuLike = () => {
    const navigate = useNavigate();
    const clickDetail=()=>{
        navigate("/CommuDetail")
    }
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

export default CommuLike