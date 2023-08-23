import React, {useState} from 'react';
import ProjectPage from '../project/ProjectPage';
import ProjectListTemplate from '../project/ProjectListTemplate';
import { Link } from 'react-router-dom';
import {AiFillStar} from 'react-icons/ai';

const ProjectDonat = ({savedProjects, setIsOpen, user}) => {
    console.log('donates user',user.donatesProjects);

    const reverseDonatesProjects = [...user.donatesProjects].reverse();
    return (
        <div className='project_wrap new_modal_project donat_wrap_page'>
            <div className="profile_title favorit_title">
                <button onClick={() => setIsOpen(state => !state )}>Close</button>
                <h2>Favorite</h2>
            </div>
            {/* {user.donatesProjects.map((item,idx) => (
                <Link to={`/project/${item._id}`} key={item._id}>
                <ProjectListTemplate item={item}/>
                </Link>
            ))} */}
            {reverseDonatesProjects.map((item,idx)=>(
                    <Link to={`/project/${item.project?._id}`}>
                <div className='project_item'>
                        <div className='project_item-column'>
                        <h4>Name</h4>
                        <p>{item.project?.name}</p>
                        </div>
                        <div className='project_item-column'>
                        <h4>Comment</h4>
                        <p>{item.comment}</p>
                        </div>
                        <div className='project_item-column'>
                        <h4>Amount donate</h4>
                        <p>{item.sum} $</p>
                        </div>
                    
                    
                </div>
                    </Link>
            ))}

        </div>
    );
};

export default ProjectDonat;