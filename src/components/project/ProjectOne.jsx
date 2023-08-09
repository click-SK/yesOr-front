import React, {useState, useEffect} from 'react';
import { BASE_URL } from '../../http/baseUrl';
import axios from "axios";
import { Link } from 'react-router-dom'; 
import '../../styles/projectPage.scss'

const ProjectOne = () => {
    const [currentProject, setCurrentProject] = useState(null);
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 1];
        setProjectId(id);
    },[])

    useEffect(() => {
        if(projectId) {
            axios.get(`${BASE_URL}/get-one-project/${projectId}`)
            .then((res) => setCurrentProject(res.data))
        }
    },[projectId])

    console.log('curent ID', currentProject);


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
                    </div>

            </div>
        </div>
    );
};

export default ProjectOne;