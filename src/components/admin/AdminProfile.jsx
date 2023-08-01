import React, {useState} from 'react';
import SavedProject from '../profile/SavedProject';
import ProfileInfo from '../profile/ProfileInfo';
import SettingPrifile from '../profile/SettingPrifile';
import AllProjectAdmin from './AllProjectAdmin';
import MyPriject from '../profile/MyPriject';
import '../../styles/admin.scss';
import { logout } from '../../store/authAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AdminProfile = () => {
    const [isOpenProject, setIsOpenProject] = useState(true)
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    const [isOpenMyProject, setIsOpenMyProject] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.authAdmin.user);

    const handleLogout = () => {
        try {
            dispatch(logout({accessToken: user.accessToken}));
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            },1000)
        } catch(error) {
            console.log(error);
        }
    }

    const projectArr = [
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 0,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '2000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 0,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '13140$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1012300$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '100110$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 0,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '100230$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Project interesting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },

    ]

    const openProject = () =>{
        setIsOpenProject(true);
        setIsOpenProfile(false);
        setIsOpenSetting(false);
        setIsOpenMyProject(false);
    }
    const openProfile = () =>{
        setIsOpenProfile(true);
        setIsOpenProject(false);
        setIsOpenSetting(false);
        setIsOpenMyProject(false);
    }
    const openSetting = () =>{
        setIsOpenProfile(false);
        setIsOpenProject(false);
        setIsOpenSetting(true);
        setIsOpenMyProject(false);
    }
    const openMyProject = () =>{
        setIsOpenProfile(false);
        setIsOpenProject(false);
        setIsOpenSetting(false);
        setIsOpenMyProject(true);
    }

 

    return (
<div className='profile_wrap'>
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
            <div className='profile_title'>
                {/* <h2>Personal area</h2> */}
            </div>
            <ul className='profile_nav'>
                <li
                onClick={() => openProject()}
                 className={`profile_nav_item ${isOpenProject ? 'profile_nav_item-active' : ''}`}>All users</li>
                <li 
                onClick={() => openProfile()}
                className={`profile_nav_item ${isOpenProfile ? 'profile_nav_item-active' : ''}`}>Verified</li>
                <li 
                onClick={() => openSetting()}
                className={`profile_nav_item ${isOpenSetting ? 'profile_nav_item-active' : ''}`}>Not verified</li>
            </ul>
            <div className='profile_content_wraper'>
                {isOpenProject &&
                    <AllProjectAdmin
                    projectArr = {projectArr}
                    isOpen = {isOpenProfile}
                    />
                }
                {isOpenProfile &&
                    <AllProjectAdmin
                    projectArr={projectArr.filter(item => item.verif === 1)}
                    isOpen = {isOpenProfile}
                    />
                }
                {isOpenSetting &&
                    <AllProjectAdmin
                    projectArr={projectArr.filter(item => item.verif === 0)}
                    isOpen = {isOpenProfile}
                    />
                }

            </div>

        </div>
    );
};

export default AdminProfile;