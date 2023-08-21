import React, { useState } from 'react';
import ProjectPage from '../project/ProjectPage';
import { Link } from "react-router-dom";
import { BASE_URL } from "../../http/baseUrl";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProjectListTemplate from '../project/ProjectListTemplate';

const MyProject = ({ userProjects }) => {
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'inactive'

    const activeProjects = userProjects.filter(item => item.isVerified);
    const inactiveProjects = userProjects.filter(item => !item.isVerified);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='project_wrap'>
            <ul className='tabs profile_nav'>
                <li
                    className={`profile_nav_item  ${activeTab === 'active' ? 'active_tab' : ''}`}
                    onClick={() => handleTabChange('active')}
                >
                    Active Projects
                </li> 
                <li
                    className={`profile_nav_item  ${activeTab === 'inactive' ? 'active_tab' : ''}`}
                    onClick={() => handleTabChange('inactive')}
                >
                    Inactive Projects
                </li>
            </ul>
            <div className='project_list'>
                {activeTab === 'active' &&
                    activeProjects.map((item) => (
                        <Link to={`/project/${item._id}`} key={item._id}>
                            <ProjectListTemplate item={item} />
                        </Link>
                    ))}
                {activeTab === 'inactive' &&
                    inactiveProjects.map((item) => (
                        <Link to={`/project/${item._id}`} key={item._id}>
                            <ProjectListTemplate item={item} />
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default MyProject;
