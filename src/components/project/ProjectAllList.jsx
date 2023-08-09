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
    const [isOpen, setIsOpen] = useState(false);
    const [myProject, setMyPriject] = useState('');
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/get-all-projects`)
        .then((res) => setAllProjects(res.data))
    },[])

    console.log('allProjects',allProjects);

    const projectArr = [
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '2000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '3000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '4000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '5000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/Rectangle 53.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },

    ]

    const hendlerOpenProject = (item) =>{
        setMyPriject(item)
        setIsOpen(true)
    }

    console.log('project' , allProjects);

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
                <Link to={`/project/${item._id}`} key={item._id}>
                    <ProjectListTemplate item={item} />
                </Link>
            ))}
                {/* <ProjectPage
                project = {myProject}
                isOpen = {isOpen}
                setIsOpen = {setIsOpen}
                /> */}
        </div>
            </div>
        </div>
    );
};

export default ProjectAllList;