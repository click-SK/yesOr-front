import React, {useState, useEffect} from 'react';
import SavedProject from '../profile/SavedProject';
import ProfileInfo from '../profile/ProfileInfo';
import SettingPrifile from '../profile/SettingPrifile';
import AllProjectAdmin from './AllProjectAdmin';
import AllArchiveProject from './AllArchiveProject';
import MyPriject from '../profile/MyPriject';
import '../../styles/admin.scss';
import { logout } from '../../store/authAdmin';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserList from './userList/UserList';
import $api from '../../http/httpAdmin';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
const AdminProfile = () => {
    const [isOpenAllUsers, setIsOpenAllUsers] = useState(true);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [isOpenArchive, setIsOpenArchive] = useState(false);
    const [reloadUserData, setReloadUserData] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allVerifiedProject, setAllVerifiedProject] = useState([]);
    const [allNotVerifiedProject, setAllNotVerifiedProject] = useState([]);
    const [allArchiveProject, setAllArchiveProject] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.authAdmin.user);
    const admin = useSelector((state) => state.authAdmin.user);

    useEffect(() => {
        try {
            $api.get(`/get-all-users`).then((res) => setAllUsers(res.data));
        } catch(error) {
          console.log(error);
        }
      }, [admin, reloadUserData]);

      useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-verified-projects`)
            .then((res) => setAllVerifiedProject(res.data))
        } catch(error) {
            console.log(error);
        }
      },[reloadUserData])

      useEffect(() => {
          try {
            axios.get(`${BASE_URL}/get-all-not-verified-projects`)
            .then((res) => setAllNotVerifiedProject(res.data))
        } catch(error) {
            console.log(error);
        }
      },[reloadUserData])

      useEffect(() => {
          try {
            axios.get(`${BASE_URL}/get-allarchive-projects`)
            .then((res) => setAllArchiveProject(res.data))
        } catch(error) {
            console.log(error);
        }
      },[reloadUserData])

    const handleLogout = () => {
        try {
                dispatch(logout({accessToken: user.accessToken}));
                navigate('/');
                setTimeout(() => {
                        window.location.reload();
                },300)
        } catch(error) {
            console.log(error);
        }
    }

    const openProject = () =>{
        setIsOpenAllUsers(true);
        setIsOpenProfile(false);
        setIsOpenSetting(false);
        setIsOpenArchive(false);
    }
    const openProfile = () =>{
        setIsOpenProfile(true);
        setIsOpenAllUsers(false);
        setIsOpenSetting(false);
        setIsOpenArchive(false);
    }
    const openSetting = () =>{
        setIsOpenProfile(false);
        setIsOpenAllUsers(false);
        setIsOpenArchive(false);
        setIsOpenSetting(true);
    }
    const openArchive = () =>{
        setIsOpenProfile(false);
        setIsOpenAllUsers(false);
        setIsOpenSetting(false);
        setIsOpenArchive(true);
    }

    const handleAddToVerified = (item) => {
        try {
            axios.post(`${BASE_URL}/add-project-to-verified`, {
                projectId: item?.projects?._id,
                currentId: item?._id
            }).then(() => {
                setTimeout(() => {
                    setReloadUserData((state) => !state)
                },1000)
            })
        } catch(error) {
            console.log(error);
        }
    }
    const handleRemoveFromVerified = (item) => {
        try {
            axios.post(`${BASE_URL}/add-project-to-not-verified`, {
                projectId: item?.projects?._id,
                currentId: item?._id
            }).then(() => {
                setTimeout(() => {
                    setReloadUserData((state) => !state)
                },1000)
            })
        } catch(error) {
            console.log(error);
        }
    }

 

    return (
<div className='profile_wrap'>
    <div className='btn_wrap-admin'>
        <button className='btn_profile-logout' onClick={handleLogout}>Logout</button>
    </div>
            <div className='profile_title'>
                {/* <h2>Personal area</h2> */}
            </div>
            <ul className='profile_nav'>
                <li
                onClick={() => openProject()}
                 className={`profile_nav_item ${isOpenAllUsers ? 'profile_nav_item-active' : ''}`}>All users</li>
                <li 
                onClick={() => openProfile()}
                className={`profile_nav_item ${isOpenProfile ? 'profile_nav_item-active' : ''}`}>Verified</li>
                <li 
                onClick={() => openSetting()}
                className={`profile_nav_item ${isOpenSetting ? 'profile_nav_item-active' : ''}`}>Not verified</li>
                <li 
                onClick={() => openArchive()}
                className={`profile_nav_item ${isOpenArchive ? 'profile_nav_item-active' : ''}`}>Archive</li>
            </ul>
            <div className='profile_content_wraper'>
                {isOpenAllUsers &&
                    <UserList
                    allusers={allUsers}
                    setReloadUserData={setReloadUserData}
                    />
                }
                {isOpenProfile &&
                    <AllProjectAdmin
                    projectArr={allVerifiedProject && allVerifiedProject}
                    verified={true}
                    handleChangeFunc={handleRemoveFromVerified}
                    />
                }
                {isOpenSetting &&
                    <AllProjectAdmin
                    projectArr={allNotVerifiedProject && allNotVerifiedProject}
                    verified={false}
                    handleChangeFunc={handleAddToVerified}
                    />
                }
                {isOpenArchive &&
                    <AllArchiveProject
                    projectArr={allArchiveProject && allArchiveProject}
                    // verified={false}
                    // handleChangeFunc={handleAddToVerified}
                    />
                }
                
            </div>
        </div>
    );
};

export default AdminProfile;