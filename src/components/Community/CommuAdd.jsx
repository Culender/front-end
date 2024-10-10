import React from 'react'
import { useNavigate } from "react-router-dom";
import back from '../../assets/img/Feed/back.svg'

const CommuAdd = () => {
    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1);
    };
    return (
        <div className='commu_add_wrap'>
            <div className="header">
                <img src={back} alt="" className="back" onClick={onClickBack} />
                <p className="title">커뮤니티 글쓰기</p>
            </div>
            <select name="type" id="">
                <option value="mate">직관메이트</option>
                <option value="event">이벤트</option>
            </select>
            <div className="notion">
                <p className="title">안내</p>
                <p className="text">다른 목적의 글은 올리실 수 없어요</p>
            </div>
            <input type="text" placeholder='제목을 입력하세요' className='commu_title' />
            <input type="text" className='commu_text' placeholder='본문 내용을 입력하세요'/>
            <div className="done">완료</div>
        </div>
    )
}

export default CommuAdd