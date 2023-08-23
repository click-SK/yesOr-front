import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ProjectListTemplate from '../project/ProjectListTemplate';

const MyProject = ({ userProjects }) => {
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'inactive'

    const activeProjects = userProjects.filter(item => item?.isVerified);
    const inactiveProjects = userProjects.filter(item => !item?.isVerified);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const reversedActiveProjects = [...activeProjects].reverse();
    const reversedInactiveProjects = [...inactiveProjects].reverse();

    return (
        <div className='project_wrap my_project_wrap'>
            <ul className='tabs profile_nav'>
                <li
                    className={`profile_nav_item my_proj_tabs  ${activeTab === 'active' ? 'active_tab' : ''}`}
                    onClick={() => handleTabChange('active')}
                >
                    Active Projects
                </li> 
                <li
                    className={`profile_nav_item my_proj_tabs  ${activeTab === 'inactive' ? 'active_tab' : ''}`}
                    onClick={() => handleTabChange('inactive')}
                >
                    Inactive Projects
                </li>
            </ul>
            <div className='project_list'>
                {activeTab === 'active' &&
                    reversedActiveProjects.map((item) => (
                        <Link to={`/project/${item?._id}`} key={item._id}>
                            <ProjectListTemplate item={item} />
                        </Link>
                    ))}
                {activeTab === 'inactive' &&
                    reversedInactiveProjects.map((item) => (
                        <Link to={`/project/${item?._id}`} key={item._id}>
                            <ProjectListTemplate item={item} />
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default MyProject;
