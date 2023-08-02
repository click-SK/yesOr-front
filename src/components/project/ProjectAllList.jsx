import React, {useState} from 'react';
import ProjectPage from '../project/ProjectPage';
import FilterBudget from './filters/FilterBudget';
import FilterCategories from './filters/FilterCategories';
import FilterDataPicker from './filters/FilterDataPicker';
import FilterSearch from './filters/FilterSearch';
import FilterByName from './filters/FilterByName';

const ProjectAllList = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [myProject, setMyPriject] = useState('')

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
            {projectArr.map((item,idx) => (
                <div
                onClick={(e) => hendlerOpenProject(item)}
                className='project_item' key={idx}>
                    <img src={item.img} alt="itemimg" />
                    <div>
                    <h4>Info</h4>
                    <p>{item.info}</p>
                    </div>
                    <div>
                    <h4>Budget</h4>
                    <p>{item.budget}</p>
                    </div>
                    <div>
                    <h4>Main info</h4>
                    <p>{item.mainInfo}</p>
                    </div>
                </div>
            ))}
                <ProjectPage
                project = {myProject}
                isOpen = {isOpen}
                setIsOpen = {setIsOpen}
                />
        </div>
            </div>
        </div>
    );
};

export default ProjectAllList;