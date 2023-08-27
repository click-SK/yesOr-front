import React, {useEffect, useState} from 'react';
import ProjectListTemplate from '../../project/ProjectListTemplate';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination';

const UserAllProjects = ({projects, setIsOpen}) => {
    const [paginationArray, setPaginationArray] = useState([]);
    const [savedArray, setSavedArray] = useState([]);

    useEffect(() => {
        if(projects) {
            setSavedArray(projects)
        }
    },[projects])
    return (
        <div className='modal_wrap'>
            <div className='project_wrap modal_admin modal'>
                {paginationArray.length != 0 && paginationArray.map((item,idx) => (
                    <Link to={`/project/${item._id}`} key={item._id}>
                    <ProjectListTemplate item={item}/>
                    </Link>
                ))}
                    <Pagination dataArray={savedArray} setFilterArray={setPaginationArray}/>
            <button onClick={() => setIsOpen(state => !state)}>Close</button>
            </div>
        </div>
    );
};


export default UserAllProjects;