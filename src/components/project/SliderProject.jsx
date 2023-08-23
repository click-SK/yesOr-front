import React, { useState, useEffect } from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import '../../styles/sliderProject.scss'

const SliderProject = ({ currentExtension, BASE_URL, currentImg, imgProject, setCurrentImg }) => {
    const [visibleImages, setVisibleImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Встановлюємо видимі фото при першому завантаженні компонента
        if (imgProject.length > 0) {
            setVisibleImages(imgProject.slice(1, 6));
        }
    }, [imgProject]);

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgProject.length);
        updateVisibleImages(currentIndex + 1);
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imgProject.length) % imgProject.length);
        updateVisibleImages(currentIndex - 1);
    };

    const updateVisibleImages = (index) => {
        const newVisibleImages = [];
        for (let i = index + 1; i <= index + 5; i++) {
            newVisibleImages.push(imgProject[i % imgProject.length]);
        }
        setVisibleImages(newVisibleImages);
    };

    const handleImageClick = (data) => {
        setCurrentImg(data);
        const newDataIndex = imgProject.findIndex(item => item === data);
        updateVisibleImages(newDataIndex);
        console.log('data', data);
    };

    return (
        <div className="project_description_wrap">
            {['jpg', 'jpeg', 'png', 'JPG'].includes(currentExtension) && (
                <img className="main_img-project_slide" src={`${BASE_URL}${currentImg}`} alt="" />
            )}
            {['mp4', 'webm'].includes(currentExtension) && (
                <video controls className="main_img-project_slide" src={`${BASE_URL}${currentImg}`} alt="" />
            )}
            <div className="second_img_wrap">
                <div className='btn_wrap-slider btn_up' onClick={handlePrevImage} onMouseDown={(e) => e.preventDefault()}>
                    <BsArrowUp />
                </div>
                <div className='second_img-project'>
                    {visibleImages.map((data, idx) => {
                        return (
                            <div key={idx} className="new_project_image_block">
                                <img
                                    key={idx}
                                    src={`${BASE_URL}${data}`}
                                    onClick={() => handleImageClick(data)}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
                <div className='btn_wrap-slider btn_down' onClick={handleNextImage} onMouseDown={(e) => e.preventDefault()}>
                    <BsArrowDown />
                </div>
            </div>
        </div>
    );
};

export default SliderProject;
