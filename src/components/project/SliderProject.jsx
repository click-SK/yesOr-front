import React, { useState, useEffect } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import '../../styles/sliderProject.scss';

const SliderProject = ({ currentExtension, BASE_URL, currentImg, imgProject, setCurrentImg }) => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imgProject.length > 0) {
      setVisibleImages(imgProject.slice(0, Math.min(5, imgProject.length)));
    }
  }, [imgProject]);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % imgProject.length;
      updateVisibleImages(newIndex);
      return newIndex;
    });
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + imgProject.length) % imgProject.length;
      updateVisibleImages(newIndex);
      return newIndex;
    });
  };

  const updateVisibleImages = (index) => {
    const newVisibleImages = [];
    const length = imgProject.length;
    const maxImagesToShow = Math.min(length, 5);

    for (let i = 0; i < maxImagesToShow; i++) {
      newVisibleImages.push(imgProject[(index + i) % length]);
    }

    setVisibleImages(newVisibleImages);
  };

  const handleImageClick = (data) => {
    setCurrentImg(data);
    const newDataIndex = imgProject.findIndex((item) => item === data);
    updateVisibleImages(newDataIndex);
  };

  return (
    <div className="project_description_wrap">
      {['jpg', 'jpeg', 'png', 'webm', 'JPG'].includes(currentExtension) && (
        <img className="main_img-project_slide" src={`${BASE_URL}${currentImg}`} alt="" />
      )}
      {['mp4', 'webm'].includes(currentExtension) && (
        <video controls className="main_img-project_slide" src={`${BASE_URL}${currentImg}`} alt="" />
      )}
      <div className="second_img_wrap">
        <div className="btn_wrap-slider btn-adaptive btn_up" onClick={handlePrevImage} onMouseDown={(e) => e.preventDefault()}>
          <BsArrowUp />
        </div>
        <div className="second_img-project">
          {visibleImages.map((data, idx) => (
            <div key={idx} className="new_project_image_block">
              <img key={idx} src={`${BASE_URL}${data}`} onClick={() => handleImageClick(data)} alt="" />
            </div>
          ))}
        </div>
        <div className="btn_wrap-slider btn-adaptive btn_down" onClick={handleNextImage} onMouseDown={(e) => e.preventDefault()}>
          <BsArrowDown />
        </div>
      </div>
    </div>
  );
};

export default SliderProject;
