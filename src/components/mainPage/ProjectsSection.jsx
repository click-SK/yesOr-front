import React, { useState, useEffect } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import { Link } from 'react-router-dom';


const ProjectsMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [percentCollected, setPercentCollected] = useState(0);

  useEffect(() => {
    try {
      axios.get(`${BASE_URL}/get-project-main-page`).then((res) => {
        setProjectData(res.data);
      });
    } catch(error) {
        console.log(error);
    }
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

  const activeProject = projectData[activeIndex]?.project;
  const prevProject = projectData[(activeIndex - 1 + projectData.length) % projectData.length]?.project;
  const nextProject = projectData[(activeIndex + 1) % projectData.length]?.project;

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



  return (
    <section id="project" className="section project">
      <div className="project_description">
        <h2 className="section_title project_description_title">Projects</h2>
      </div>
      <div className="project_carousel">
        <div className="project_img_wrap">
          <div className={`project_second ${animationDirection === 'prev' ? 'active' : ''}`}>
            <img  src={`${BASE_URL}${prevProject?.projectMedia[0]}`} alt="" />
            <p className="project_second_name">{prevProject?.name}</p>
          </div>
          {/* <Link to={`/project/${item.project?._id}`}></Link> */}
          <Link to={`/project/${activeProject?._id}`}>
            <div className={`project_active ${animationDirection ? 'inactive' : 'active'}`}>
              <img src={`${BASE_URL}${activeProject?.projectMedia[0]}`}  alt="" />
              <p className="project_active_name">{activeProject?.name}</p>
                      <div className="target_wrap main_page-project-amount">
                        <div className="target_wrap_title main_page-project-title ">
                          <p>{activeProject?.target} $</p>
                        </div>
                        <div className="target_range">
                          <div
                          className="target_curent"
                          style={{ width: `${percentCollected}%` }}
                          ></div>
                      </div>
                        <p style={{ width: `${percentCollected}%`, textAlign: "right", maxWidth:'100%' }}>
                          {percentCollected.toFixed(2)}%
                        </p>
                    </div>
            </div>
          </Link>
          <div className={`project_second ${animationDirection === 'next' ? 'active' : ''}`}>
            <img src={`${BASE_URL}${nextProject?.projectMedia[0]}`} alt="" />
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
