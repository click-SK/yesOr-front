import React, {useEffect, useState} from 'react';
import ProjectPage from '../project/ProjectPage';
import ProjectListTemplate from '../project/ProjectListTemplate';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
const SavedProject = ({savedProjects}) => {
    const [paginationArray, setPaginationArray] = useState([]);
    const [savedArray, setSavedArray] = useState([]);

    useEffect(() => {
        if(savedProjects) {
            setSavedArray(savedProjects)
        }
    },[savedProjects])
    return (
        <div className='project_wrap'>
            {paginationArray.length != 0 && paginationArray.map((item,idx) => (
                <Link to={`/project/${item._id}`} key={item._id}>
                <ProjectListTemplate item={item}/>
                </Link>
            ))}
                <Pagination dataArray={savedArray} setFilterArray={setPaginationArray}/>
        </div>
    );
};

export default SavedProject;