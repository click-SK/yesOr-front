import React, { useState, useEffect } from 'react';

const AboutUsMain = () => {
  const projectData = [
    {
        id: 1,
        image: './mainPage/courosel/aboutUs/image 1.png',
    },
    {
        id: 2,
        image: './mainPage/courosel/aboutUs/image 2.png',
    },
    {   
        id: 3,
        image: './mainPage/courosel/aboutUs/image 1.png',
    },
    {
        id: 4,
        image: './mainPage/courosel/aboutUs/image 2.png',
    },
    {
        id: 5,
        image: './mainPage/courosel/aboutUs/image 1.png',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [widthProgress, setWidthProgress] = useState('width:"40%"')

  const handlePrev = () => {
    try {
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
    } catch(error) {
        console.log(error);
    }
  };

  const handleNext = () => {
    try {
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
    } catch(error) {
        console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Виклик handleNext кожні 1.5 секунди
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex]);

 

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

  return (
    <section id='about_us' className='section about_us'>
      <div className='about_us_description'>
        <h2 className='section_title about_us_description_title'>About Us</h2>
        <div className='about_us_description_text'>
          <p>
          We’re more than just a crowdfunding platform; we’re a passionate team based in Ukraine, dedicated to supporting creators, innovators, and visionaries. We thrive despite the challenges posed by the ongoing war.

          </p>
          <p>
          Why Choose Us: <br/>

• Passion for Innovation: We’re driven by a deep passion for nurturing creativity and innovation.<br/>
• Collective Strength: Our team joins forces to amplify your vision and potential.<br/>
• Transparency and Trust: We uphold transparency, building trust between creators and backers.<br/>
• Your Projects, Our Mission: We exist to support you on your journey, bringing your ideas to life.

          </p>
          {/* <p>Join us in this creative adventure, where we transform dreams into reality, even amidst the challenges of war.</p> */}
        </div>
      </div>

      <div className='about_us_courosel'>
        <div className='about_us_img_wrap'>
            <div className={`carousel-image ${animationDirection === 'prev' ? 'active' : ''}`}>
                <img src={prevProject.image} alt="" />
            </div>
            <div className={`carousel-image ${animationDirection ? 'inactive' : 'active'}`}>
                <img src={activeProject.image} alt="" />
                
            </div>
            <div className={`carousel-image ${animationDirection === 'next' ? 'active' : ''}`}>
                <img src={nextProject.image} alt="" />
                
            </div>
          <div className='courosel_count'>
            <p onClick={handlePrev} className='count_value'>0{activeIndex}</p>
            <div className='count_progress'>
              <div className='progress_bg'></div>
              <div 
              style={{ width: widthProgress }}
              className='progress_active'></div>
            </div>
            <p onClick={handleNext} className='count_value'>05</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsMain;
