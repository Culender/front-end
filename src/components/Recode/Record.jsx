import React, { useState, useRef } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';

const Record = () => {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState({
    date: '',
    title: '',
    location: '',
    review: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [isCameraPopupOpen, setIsCameraPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => setShowPopup(false);

  const handleCameraClick = async () => {
    setShowPopup(false); 
    setIsCameraPopupOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const takePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setImage(dataUrl);
    setIsCameraPopupOpen(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());

    handleOcrFromCanvas();
  };

  const handleImageChange = (e) => {
    setShowPopup(false); 
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setImage(reader.result);
      handleOcrFromFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleOcrFromFile = async (file) => {
    Tesseract.recognize(file, 'kor', {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        processOcrResult(text);
      })
      .catch((err) => {
        console.error('OCR Error:', err);
      });
  };

  const handleOcrFromCanvas = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      Tesseract.recognize(blob, 'kor', {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          processOcrResult(text);
        })
        .catch((err) => {
          console.error('OCR Error:', err);
        });
    });
  };

  const processOcrResult = (text) => {
    const cleanedText = text
      .replace(/\s+/g, ' ')
      .replace(/[^가-힣0-9\s년월일:]/g, '')
      .replace(/장\s*소\s*:/, '장소:')
      .trim();

    const datePattern = /\d{4}년\s*\d{1,2}월\s*\d{1,2}일/;
    const dateMatch = cleanedText.match(datePattern);
    const extractedDate = dateMatch ? `${dateMatch[0].replace(/\s+/g, '').replace(/년|월/g, '.').replace(/일/, '')}` : '날짜 정보 없음';

    const locationPattern = /장소[:\s]*(.+?)(?=\s*\d{4}년|\s*\d{1,2}월|\s*\d{1,2}일|$)/;
    const locationMatch = cleanedText.match(locationPattern);
    let extractedLocation = locationMatch ? locationMatch[1].trim() : '';

    if (extractedLocation) {
      extractedLocation = extractedLocation
        .replace(/\d+층|\d+구역|\d+열|\d+번|석/g, '')
        .replace(/ +/g, ' ')
        .trim();
    }

    if (!extractedLocation || extractedLocation.length === 0) {
      extractedLocation = '장소 정보 없음';
    }

    setImageData({
      date: extractedDate,
      location: extractedLocation,
    });
  };

  const handleCameraPopupClose = () => {
    setIsCameraPopupOpen(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    console.log('현재 사용 중인 토큰:', token);

    if (!token) {
      console.error('토큰이 없습니다. 다시 로그인하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('date', imageData.date);
    formData.append('title', imageData.title);
    formData.append('place', imageData.location);
    formData.append('content', imageData.review);

    try {
      const blob = await fetch(image).then((res) => res.blob());
      formData.append('image', blob, 'image.png');

      const response = await axios.post('http://3.36.209.83:8080/api/record/createRecord', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('성공적으로 업로드되었습니다:', response.data);
      setShowSuccessPopup(true); 
    } catch (error) {
      if (error.response) {
        console.error('서버 응답 오류:', error.response.data);
      } else {
        console.error('요청 중 오류 발생:', error.message);
      }
    }
  };

  return (
    <div className="record_wrap container">
      <div className="photo-record">
        <h1>관람 기록</h1>

        <label>사진</label>
        <div className="photo-container">
          {image ? (
            <img src={image} alt="선택한 이미지" className="image-preview" />
          ) : (
            <div className="image-placeholder">이미지</div>
          )}
          <button className="add-photo-button" onClick={handlePopupOpen}>+</button>
        </div>

        <label>제목</label>
        <input
          type="text"
          value={imageData.title}
          onChange={(e) => setImageData({ ...imageData, title: e.target.value })}
          className="date-input"
          placeholder="제목을 입력해주세요"
        />

        <label>날짜</label>
        <input
          type="text"
          value={imageData.date}
          onChange={(e) => setImageData({ ...imageData, date: e.target.value })}
          className="date-input"
          placeholder="YYYY.MM.DD 형식으로 입력해주세요"
        />

        <label>장소</label>
        <input
          type="text"
          value={imageData.location}
          onChange={(e) => setImageData({ ...imageData, location: e.target.value })}
          className="location-input"
          placeholder="장소를 입력해주세요"
        />

        <label>내용(후기)</label>
        <textarea
          className="review-input"
          value={imageData.review}
          onChange={(e) => setImageData({ ...imageData, review: e.target.value })}
          placeholder="후기를 입력해주세요"
        ></textarea>

        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>저장</button>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="popup-close" onClick={handlePopupClose}>×</button>
              
              <button className="popup-option" onClick={handleCameraClick}>카메라로 사진 촬영</button>
              <button
                className="popup-option"
                onClick={() => {
                  setShowPopup(false); 
                  document.getElementById('imageUpload').click();
                }}
              >
                앨범에서 이미지 선택
              </button>
            </div>
          </div>
        )}

        {isCameraPopupOpen && (
          <div className="camera-popup">
            <div className="camera-popup-content">
              <button className="popup-close" onClick={handleCameraPopupClose}>×</button>
              <video ref={videoRef} autoPlay className="video-preview"></video>
              <button onClick={takePhoto}>사진 촬영</button>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="success-popup" onClick={() => setShowSuccessPopup(false)}>
            기록 저장이 완료되었습니다!
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default Record;
