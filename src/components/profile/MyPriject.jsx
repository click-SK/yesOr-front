import React, {useState, useEffect} from 'react';
import ProjectPage from '../project/ProjectPage';
import { Link } from "react-router-dom";
import { BASE_URL } from "../../http/baseUrl";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProjectListTemplate from '../project/ProjectListTemplate';
const MyPriject = ({userProjects}) => {

    return (
        <div className='project_wrap'>
            {userProjects.length != 0 && userProjects.map((item) => (
                <Link to={`/project/${item._id}`} key={item._id}>
                <ProjectListTemplate item={item}/>
                </Link>
            ))}
        </div>
    );
};

export default MyPriject;