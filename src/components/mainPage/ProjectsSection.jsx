import React, { useState, useEffect } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";

const ProjectsMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/get-project-main-page`).then((res) => {
      setProjectData(res.data);
    });
  }, []);

  const handlePrev = () => {
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
  };

  const handleNext = () => {
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
  };

  const activeProject = projectData[activeIndex]?.project;
  const prevProject = projectData[(activeIndex - 1 + projectData.length) % projectData.length]?.project;
  const nextProject = projectData[(activeIndex + 1) % projectData.length]?.project;

  return (
    <section id="project" className="section project">
      <div className="project_description">
        <h2 className="section_title project_description_title">Projects</h2>
      </div>
      <div className="project_carousel">
        <div className="project_img_wrap">
          <div className={`project_second ${animationDirection === 'prev' ? 'active' : ''}`}>
            <img src={prevProject?.image} alt="" />
            <p className="project_second_name">{prevProject?.name}</p>
          </div>
          <div className={`project_active ${animationDirection ? 'inactive' : 'active'}`}>
            <img src={activeProject?.image} alt="" />
            <p className="project_active_name">{activeProject?.name}</p>
          </div>
          <div className={`project_second ${animationDirection === 'next' ? 'active' : ''}`}>
            <img src={nextProject?.image} alt="" />
            <p className="project_second_name">{nextProject?.name}</p>
          </div>
        </div>
        <div className='courosel_control'>
          <div className='left_arrow' onClick={handlePrev}>
            <HiOutlineArrowNarrowLeft />
          </div>
          <div className='right_arrow' onClick={handleNext}>
            <HiOutlineArrowNarrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsMain;
