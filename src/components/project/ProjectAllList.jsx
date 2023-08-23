import React, {useState, useEffect} from 'react';
import ProjectPage from '../project/ProjectPage';
import FilterBudget from './filters/FilterBudget';
import FilterCategories from './filters/FilterCategories';
import FilterDataPicker from './filters/FilterDataPicker';
import FilterSearch from './filters/FilterSearch';
import FilterByName from './filters/FilterByName';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import ProjectListTemplate from './ProjectListTemplate';
import { Link } from 'react-router-dom';

const ProjectAllList = () => {
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-verified-projects`)
            .then((res) => setAllProjects(res.data))
        } catch(error) {
            console.log(error);
        }
    },[])

    return (
        <div className='profile_wrap'>
            <div className='profile_title'>
                <h2>Project</h2>
                <div className='top_filters'>
                    <FilterDataPicker/>
                    <FilterSearch/>
                    <FilterByName/>
                </div>
            </div>
            <div className='profile_content_wraper project_content_wraper'>
                <div className='aside_filters'>
                    <FilterBudget/>
                    <FilterCategories/>
                </div>
            <div className='project_wrap project_wrap_page'>
            {allProjects.length != 0 && allProjects.map((item) => (
                <Link to={`/project/${item?.projects?._id}`} key={item._id}>
                    <ProjectListTemplate item={item?.projects} />
                </Link>
            ))}
        </div>
            </div>
        </div>
    );
};

export default ProjectAllList;