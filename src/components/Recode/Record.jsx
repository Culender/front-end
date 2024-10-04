import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const Record = () => {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState({
    date: '',
    location: '',
    review: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [isCameraPopupOpen, setIsCameraPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => setShowPopup(false);

  const handleCameraClick = async () => {
    handlePopupClose();
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
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setImage(reader.result);
      handleOcrFromFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleOcrFromCanvas = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      Tesseract.recognize(
        blob,
        'kor', 
        {
          logger: (m) => console.log(m),
        }
      )
        .then(({ data: { text } }) => {
          processOcrResult(text);
        })
        .catch((err) => {
          console.error('OCR Error:', err);
        });
    });
  };

  const handleOcrFromFile = async (file) => {
    Tesseract.recognize(
      file,
      'kor', 
      {
        logger: (m) => console.log(m),
      }
    )
      .then(({ data: { text } }) => {
        processOcrResult(text);
      })
      .catch((err) => {
        console.error('OCR Error:', err);
      });
  };

  const processOcrResult = (text) => {
    console.log('OCR Result:', text);

    const cleanedText = text
      .replace(/\s+/g, ' ')
      .replace(/[^가-힣0-9\s년월일:]/g, '')
      .replace(/장\s*소\s*:/, '장소:')
      .trim();

    console.log('Cleaned Text:', cleanedText);

    const datePattern = /\d{4}년\s*\d{1,2}월\s*\d{1,2}일/;
    const dateMatch = cleanedText.match(datePattern);
    const extractedDate = dateMatch ? `${dateMatch[0].replace(/\s+/g, '').replace(/년|월/g, '.').replace(/일/, '')}` : '날짜 정보 없음';

    console.log('Extracted Date (formatted):', extractedDate);

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

    console.log('Extracted Location:', extractedLocation);

    setImageData({
      date: extractedDate,
      location: extractedLocation,
    });
  };

  const handleCameraPopupClose = () => {
    setIsCameraPopupOpen(false);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
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
          placeholder="장소를 입력하세요"
        />

        <label>내용(후기)</label>
        <textarea
          className="review-input"
          value={imageData.review}
          onChange={(e) => setImageData({ ...imageData, review: e.target.value })}
          placeholder="후기를 입력하세요"
        ></textarea>

        <div className="button-group">
          <button className="save-button">저장</button>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="popup-close" onClick={handlePopupClose}>×</button>
              
              <button className="popup-option" onClick={handleCameraClick}>카메라로 사진 촬영</button>
              <button className="popup-option" onClick={() => document.getElementById('imageUpload').click()}>앨범에서 이미지 선택</button>
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
