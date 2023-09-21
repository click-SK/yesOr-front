import React, { useState, useEffect } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import axios from "axios";
import { BASE_URL } from "../../../http/baseUrl";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';


const CatSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [percentCollected, setPercentCollected] = useState(0);
  const [catUrl, setCatUrl] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`${BASE_URL}/get-all-category`).then((res) => {
        setProjectData(res.data);
      }).catch((error) => {
        console.log('Request error',error);
    })
  }, []);

  const handlePrev = () => {
    try {
      setAnimationDirection('prev');
      setTimeout(() => {
        setActiveIndex((prevIndex) => {
          if (prevIndex === 0) {
            return projectData.length - 1;
          } else {
            return prevIndex - 1;
          }
        });
        setAnimationDirection(null);
      }, 500);
    } catch(error) {
        console.log(error);
    }
  };

  const handleNext = () => {
    try {
      setAnimationDirection('next');
      setTimeout(() => {
        setActiveIndex((prevIndex) => {
          if (prevIndex === projectData.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
        setAnimationDirection(null);
      }, 500);
    } catch(error) {
        console.log(error);
    }
  };

  const activeProject = projectData[activeIndex];
  const prevProject = projectData[(activeIndex - 1 + projectData.length) % projectData.length];
  const nextProject = projectData[(activeIndex + 1) % projectData.length];

  // const percent = (collected / target) * 100;
  // setPercentCollected(percent);

  useEffect(() => {
    try {
      if (activeProject) {
        const collected = activeProject?.amountCollected;
        const target = activeProject?.target;
        const percent = (collected / target) * 100;
        setPercentCollected(percent);
      }
    } catch(error) {
      console.log(error);
    }
  }, [activeProject]);

  const  hendlerOpenCategories = (item) => {
    const nameArr = item.map(item => item.name);
    const catString = nameArr.join(',')
    setCatUrl(catString)
    navigate(`/discover?cat=${catString}`)
}

  return (
      <>
        <div className="project_img_wrap">
          <div className={`categories_wrap_item ${prevProject?.category}`}>
            <p className="categories_wrap_title">{prevProject?.category}</p>
            {prevProject?.subcategory.map ((sub, idx) => (
                    <p key={idx} className='categories_wrap_descript'> - {sub.name}</p>
                ))}
          </div>

            <div className={`categories_wrap_item ${activeProject?.category}`}
            onClick={() => hendlerOpenCategories (activeProject?.subcategory)}>
              <img className='categories_wrap_item_img' src={`/icons/cat-${activeProject?.index}.svg`} alt="" />
              <p className="categories_wrap_title">{activeProject?.category}</p>
                {activeProject?.subcategory.map ((sub, idx) => (
                    <p key={idx} className='categories_wrap_descript'> - {sub.name}</p>
                ))}
            </div>

            <div className={`categories_wrap_item ${nextProject?.category}`}>
            <p className="categories_wrap_title">{nextProject?.category}</p>
            {nextProject?.subcategory.map ((sub, idx) => (
                    <p key={idx} className='categories_wrap_descript'> - {sub.name}</p>
                ))}
          </div>

        </div>
        <div style={{marginTop:'50px'}} className='courosel_control'>
          <div className='left_arrow' onClick={handlePrev}>
            <HiOutlineArrowNarrowLeft />
          </div>
          <div className='right_arrow' onClick={handleNext}>
            <HiOutlineArrowNarrowRight />
          </div>
        </div>
      </>
  );
};

export default CatSlider;
