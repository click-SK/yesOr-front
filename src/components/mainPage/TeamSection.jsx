import React, { useState, useEffect } from 'react';

const TeamSection = () => {
    const projectData = [
    {
        id: 1,
        image: './mainPage/courosel/team/foto1.png',
        name: 'Tom Ford',
        employee: 'manager 1'
    },
    {
        id: 2,
        image: './mainPage/courosel/team/foto2.png',
        name: 'Tom Ford',
        employee: 'manager 2'
    },
    {
        id: 3,
        image: './mainPage/courosel/team/foto1.png',
        name: 'Tom Ford',
        employee: 'manager 3'
    },
    {
        id: 4,
        image: './mainPage/courosel/team/foto2.png',
        name: 'Tom Ford',
        employee: 'manager 4'
    },
    {
        id: 5,
        image: './mainPage/courosel/team/foto2.png',
        name: 'Tom Ford',
        employee: 'manager 5'
    },
  ];
  

  const [activeIndex, setActiveIndex] = useState(2);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [widthProgress, setWidthProgress] = useState('width:"40%"')

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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Виклик handleNext кожні 1.5 секунди
    }, 3500);

    return () => clearInterval(interval);
  }, []);

 

  useEffect(() => {
    const calculateWidthProgress = () => {
      if (activeIndex === 1) {
        setWidthProgress('20%');
      } else if (activeIndex === 2) {
        setWidthProgress('40%');
      } else if (activeIndex === 3) {
        setWidthProgress('60%');
      } else if (activeIndex === 4) {
        setWidthProgress('80%');
      } else if (activeIndex === 5) {
        setWidthProgress('100%');
      }
    };

    calculateWidthProgress();
  }, [activeIndex]);

  const activeProject = projectData.find((project) => project.id === activeIndex);
  const prevProject = projectData.find((project) => project.id === (activeIndex === 1 ? projectData.length : activeIndex - 1));
  const nextProject = projectData.find((project) => project.id === (activeIndex === projectData.length ? 1 : activeIndex + 1));

  console.log(activeIndex);
    return (
        <section id='team' className='section team'>
            <div className='team_description'>
                <h2 className='section_title team_description_title'>Team</h2>
                <div className='team_description_text'>
                    <p>The Charitable Foundation is made up of dedicated agents and employees of Berkshire Hathaway HomeServices California Properties who want to make a positive and constructive impact on our local communities.</p>
                </div>
                <div>
                    <div className='exp_wrap'>
                        <div className='exp_wrap_item'>
                            <h2 className='exp_numb'>10</h2>
                            <p className='exp_text'>employees</p>
                        </div>
                        <div className='exp_wrap_item'>
                            <h2 className='exp_numb'>5</h2>
                            <p className='exp_text'>years of work</p>
                        </div>
                        <div className='exp_wrap_item'>
                            <h2 className='exp_numb'>2</h2>
                            <p className='exp_text'>office</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='team_courosel'>
                <div className='team_img_wrap'>
                    <div className={`team_img_wrap_item  ${animationDirection ? 'inactive' : 'active_img_team'} `}>
                        <img className='team_active_img'  src={activeProject.image} alt="" />
                        <div className='team_info'>
                            <p className='team_name'>{activeProject.name}</p>
                            <p className='employee'>{activeProject.employee}</p>
                        </div>
                    </div>
                    <div className={`team_img_wrap_item second_img ${animationDirection === 'next' ? 'active_img_team' : ''}`}>
                        <img className='team_active_img'  src={nextProject.image} alt="" />
                        <div className='team_info'>
                            <p className='team_name'>{nextProject.name}</p>
                            <p className='employee'>{nextProject.employee}</p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
                <div className='courosel_count team_section_count'>
                    <p onClick={handlePrev} className='count_value'>0{activeIndex}</p>
                    <div className='count_progress'>
                    <div className='progress_bg'></div>
                    <div 
                    style={{ width: widthProgress }}
                    className='progress_active'></div>
                    </div>
                    <p onClick={handleNext} className='count_value'>05</p>
                </div>
        </section>
    );
};

export default TeamSection;