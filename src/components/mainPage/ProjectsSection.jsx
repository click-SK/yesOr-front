import React from 'react';
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi';

const ProjectsMain = () => {
    return (
        <section id='project' className='section project'>
            <div className='project_description'>
                <h2 className='section_title project_description_title'>Projects</h2>
            </div>
            <div className='project_courosel'>
                <div className='project_img_wrap'>
                    <div className='project_second'>
                        <img src="./mainPage/courosel/project/image 1.png" alt="" />
                        <p className='project_second_name'>Name project</p>
                    </div>
                    <div className='project_active'>
                        <img src="./mainPage/courosel/project/image 2.png" alt="" />
                        <p className='project_active_name'>Name project</p>
                    </div>
                    <div className='project_second'>
                        <img src="./mainPage/courosel/project/image 3.png" alt="" />
                        <p className='project_second_name'>Name project</p>
                    </div>
                    
                </div>
                <div className='courosel_control'>
                    {/* <HiOutlineArrowNarrowLeft
                    className='left_arrow'/> */}
                    <div className='left_arrow'>
                    </div>
                    <div className='right_arrow'>
                    </div>
                    {/* <HiOutlineArrowNarrowRight
                    className='right_arrow'/> */}
                </div>    
            </div>
        </section>
    );
};

export default ProjectsMain;