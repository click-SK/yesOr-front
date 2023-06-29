import React, {useState} from 'react';
import '../../styles/projectPage.scss'


const ProjectPage = ({project, isOpen, setIsOpen}) => {



    return (
        <>
        {isOpen &&
        <div className='project_wraper'>
            <div 
            onClick={() => setIsOpen(!isOpen)}
            className='btn_back'>
            <button>Back</button>
            </div>
            <div className='profile_title'>
                <h2>Project</h2>
            </div>
            <div className='project_info'>
                    <div className='left_column'>
                        <div className='project_description_wrap'>
                            <img src="./file/project.png" alt="" />
                        </div>
                        <div className='project_description'>
                            <h4>Description</h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  

                                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  

                                Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  </p>
                        </div>
                        <div className='project_description'>
                            <h4>Target amount</h4>
                            <p>Lorem ipsum </p>
                        </div>
                    </div>
                    <div className='right_column'>
                        <div className='project_name_wrap'>
                            <img src={project.img} alt="" />
                            <div>
                                <h4>Name</h4>
                                <p>Lorem </p>
                            </div>
                        </div>
                        <div className='project_details'>
                            <div className='details_item'>
                                <h4>Category</h4>
                                <p>Lorem ipsum dolor sit amet consectetur. </p>
                            </div>
                            <div className='details_item'>
                            <h4>Placement period</h4>
                            <p>Lorem ipsum </p>
                            </div>
                            <div className='details_item'>
                            <h4>Subcategory</h4>
                            <p>Lorem ipsum </p>
                            </div>
                            <div className='details_item'>
                            <h4>Team </h4>
                            <p>Lorem ipsum </p>
                            </div>



                        </div>
                        <div className='project_request'>
                            <h4>Request</h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  </p>
                            <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  </p>
                            <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  </p>
                        </div>
                        <div className='project_bonus'>
                            <h4>Bonus for investors </h4>
                            <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  </p>
                        </div>
                    </div>

            </div>
        </div>

        }
            
        </>
    );
};

export default ProjectPage;