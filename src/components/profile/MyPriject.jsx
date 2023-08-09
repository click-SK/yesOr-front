import React, {useState, useEffect} from 'react';
import ProjectPage from '../project/ProjectPage';
import { Link } from "react-router-dom";
import { BASE_URL } from "../../http/baseUrl";
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProjectListTemplate from '../project/ProjectListTemplate';
const MyPriject = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [myProject, setMyPriject] = useState('');
    const [userProjects, setUserProjects] = useState([]);

    const {user} = useSelector((state) => state.authUser.user);

    console.log('user',user);

    useEffect(() => {
        axios.get(`${BASE_URL}/get-my-projects/${user._id}`)
        .then((res) => setUserProjects(res.data))
    },[])

    console.log('userProjects',userProjects);

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
            {userProjects.length != 0 && userProjects.map((item) => (
                <ProjectListTemplate item={item} hendlerOpenProject={hendlerOpenProject} key={item._id}/>
            ))}
        </div>
    );
};

export default MyPriject;