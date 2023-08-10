import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../http/baseUrl';
import axios from "axios";
import { Link } from 'react-router-dom'; 
import {AiFillStar} from 'react-icons/ai';
import '../../styles/projectPage.scss'
const ProjectOne = () => {
    const [currentProject, setCurrentProject] = useState(null);
    const [projectId, setProjectId] = useState('');
    const [donatsValue, setDonatsValue] = useState(0);
    const [fullName, setFullName] = useState('');

    const {user} = useSelector((state) => state.authUser.user);

    useEffect(() => {
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 1];
        setProjectId(id);
    },[])

    console.log('user user',user);

    useEffect(() => {
        if(projectId) {
            axios.get(`${BASE_URL}/get-one-project/${projectId}`)
            .then((res) => setCurrentProject(res.data))
        }
    },[projectId])

    console.log('currentProject', currentProject);
    console.log('currentProject user', user);

    const handleSavedProject = () => {
        axios.patch(`${BASE_URL}/saved-project`, {
            userId: user._id,
            projectId: currentProject._id
        }).then(() => window.location.reload())
    }
    const handleRemoveSavedProject = () => {
        axios.patch(`${BASE_URL}/remove-saved-project`, {
            userId: user._id,
            projectId: currentProject._id
        }).then(() => window.location.reload())
    }

    const handleStarRating = () => {
        if(user && currentProject && user.savedProjects.includes(currentProject._id)) {
            handleRemoveSavedProject();
        } else {
            handleSavedProject();
        }
    }

    const handleSendDonats = () => {
        axios.patch(`${BASE_URL}/donats-project`, {
            projectId: currentProject._id,
            sum: donatsValue,
            user: fullName,
        })
    }

    return (
    <div className='project_wraper'>
            <div 
            className='btn_back'>
            <Link to='/discover'>
                <button>Back</button>
            </Link>
            </div>
            <div className='profile_title'>
                <h2>Project</h2>
            </div>
            <div className='project_info'>
                    <div className='left_column'>
                        <div className='project_description_wrap'>
                            <img src="./file/project.png" alt="" />
                        </div>
                        <div className='project_description'>
                            <h4>Description</h4>
                            <p>{currentProject?.description}</p>
                        </div>
                        <div className='project_description'>
                            <h4>Target amount</h4>
                            <p>{currentProject?.target}</p>
                        </div>
                    </div>
                    <div className='right_column'>
                        <div className='project_name_wrap'>
                            <img src='' alt="" />
                            <div>
                                <h4>Name</h4>
                                <p>{currentProject?.name} </p>
                            </div>
                            <AiFillStar className={user && currentProject && user.savedProjects.includes(currentProject._id) ? 'star_rating_active' : 'star_rating_disabled'} onClick={handleStarRating}/>
                        </div>
                        <div className='project_details'>
                            <div className='details_item'>
                                <h4>Category</h4>
                                <p>{currentProject?.category}</p>
                            </div>
                            <div className='details_item'>
                            <h4>Placement period</h4>
                            <p>{currentProject?.period} </p>
                            </div>
                            <div className='details_item'>
                            <h4>Subcategory</h4>
                            <p>{currentProject?.subcategory}</p>
                            </div>
                            <div className='details_item'>
                            <h4>Team </h4>
                            <p>{currentProject?.team}</p>
                            </div>
                        </div>
                        <div className='project_request'>
                            <h4>Request</h4>
                            <p>{currentProject?.request}</p>
                        </div>
                        <div className='project_bonus'>
                            <h4>Bonus for investors </h4>
                            <p>{currentProject?.bonus}</p>
                        </div>
                        <div>
                        <input 
                        placeholder='Full name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}/>
                        <input 
                        type='number'
                        value={donatsValue}
                        onChange={(e) => setDonatsValue(e.target.value)}/>
                            <button onClick={handleSendDonats}>Donats</button>
                        </div>
                    </div>
            </div>
            {currentProject && user && currentProject.user == user._id &&
            currentProject?.donatsHistory.map((item) => (
                <div key={item._id}>
                    <p>{item.user}</p>
                    <p>{item.sum}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectOne;