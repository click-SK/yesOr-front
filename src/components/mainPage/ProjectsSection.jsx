import React, { useState } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';

const ProjectsMain = () => {
  const projectData = [
    {
      id: 1,
      image: './mainPage/courosel/project/image 1.png',
      name: 'Name project 1',
    },
    {
      id: 2,
      image: './mainPage/courosel/project/image 2.png',
      name: 'Name project 2',
    },
    {
      id: 3,
      image: './mainPage/courosel/project/image 3.png',
      name: 'Name project 3',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2);
  const [animationDirection, setAnimationDirection] = useState(null);

  const handlePrev = () => {
    setAnimationDirection('prev');
    setTimeout(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex === 1) {
          return projectData.length;
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
        if (prevIndex === projectData.length) {
          return 1;
        } else {
          return prevIndex + 1;
        }
      });
      setAnimationDirection(null);
    }, 5);
  };

  const activeProject = projectData.find((project) => project.id === activeIndex);
  const prevProject = projectData.find((project) => project.id === (activeIndex === 1 ? projectData.length : activeIndex - 1));
  const nextProject = projectData.find((project) => project.id === (activeIndex === projectData.length ? 1 : activeIndex + 1));

  return (
    <section id="project" className="section project">
      <div className="project_description">
        <h2 className="section_title project_description_title">Projects</h2>
      </div>
      <div className="project_carousel">
        <div className="project_img_wrap">
          <div className={`project_second ${animationDirection === 'prev' ? 'active' : ''}`}>
            <img src={prevProject.image} alt="" />
            <p className="project_second_name">{prevProject.name}</p>
          </div>
          <div className={`project_active ${animationDirection ? 'inactive' : 'active'}`}>
            <img src={activeProject.image} alt="" />
            <p className="project_active_name">{activeProject.name}</p>
          </div>
          <div className={`project_second ${animationDirection === 'next' ? 'active' : ''}`}>
            <img src={nextProject.image} alt="" />
            <p className="project_second_name">{nextProject.name}</p>
          </div>
        </div>
        <div className='courosel_control'>
          <div className='left_arrow' onClick={handlePrev}>
            <img src="./icons/Arrow left.svg" alt="" />
          </div>
          <div className='right_arrow' onClick={handleNext}>
            <img src="./icons/Arrow right.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsMain;
