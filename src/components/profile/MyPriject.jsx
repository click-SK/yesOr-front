import React, {useState} from 'react';
import ProjectPage from '../project/ProjectPage';
import { Link } from "react-router-dom";

const MyPriject = () => {

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
        <div className='project_wrap'>
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
    );
};

export default MyPriject;