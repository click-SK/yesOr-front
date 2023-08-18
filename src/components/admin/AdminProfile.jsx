import React, {useState, useEffect} from 'react';
import SavedProject from '../profile/SavedProject';
import ProfileInfo from '../profile/ProfileInfo';
import SettingPrifile from '../profile/SettingPrifile';
import AllProjectAdmin from './AllProjectAdmin';
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
    const [reloadUserData, setReloadUserData] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allVerifiedProject, setAllVerifiedProject] = useState([]);
    const [allNotVerifiedProject, setAllNotVerifiedProject] = useState([]);
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
        axios.get(`${BASE_URL}/get-all-verified-projects`)
        .then((res) => setAllVerifiedProject(res.data))
      },[reloadUserData])

      useEffect(() => {
        axios.get(`${BASE_URL}/get-all-not-verified-projects`)
        .then((res) => setAllNotVerifiedProject(res.data))
      },[reloadUserData])

      console.log('allVerifiedProject',allVerifiedProject);
      console.log('allNotVerifiedProject',allNotVerifiedProject);

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

    const openProject = () =>{
        setIsOpenAllUsers(true);
        setIsOpenProfile(false);
        setIsOpenSetting(false);
    }
    const openProfile = () =>{
        setIsOpenProfile(true);
        setIsOpenAllUsers(false);
        setIsOpenSetting(false);
    }
    const openSetting = () =>{
        setIsOpenProfile(false);
        setIsOpenAllUsers(false);
        setIsOpenSetting(true);
    }

    const handleAddToVerified = (item) => {
        axios.post(`${BASE_URL}/add-project-to-verified`, {
            projectId: item.projects._id,
            currentId: item._id
        }).then(() => {
            setTimeout(() => {
                setReloadUserData((state) => !state)
            },1000)
        })
        console.log('handleAddToVerified',item);
    }
    const handleRemoveFromVerified = (item) => {
        axios.post(`${BASE_URL}/add-project-to-not-verified`, {
            projectId: item.projects._id,
            currentId: item._id
        }).then(() => {
            setTimeout(() => {
                setReloadUserData((state) => !state)
            },1000)
        })
        console.log('handleRemoveFromVerified',item);
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
                 className={`profile_nav_item ${isOpenAllUsers ? 'profile_nav_item-active' : ''}`}>All users</li>
                <li 
                onClick={() => openProfile()}
                className={`profile_nav_item ${isOpenProfile ? 'profile_nav_item-active' : ''}`}>Verified</li>
                <li 
                onClick={() => openSetting()}
                className={`profile_nav_item ${isOpenSetting ? 'profile_nav_item-active' : ''}`}>Not verified</li>
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
            </div>
        </div>
    );
};

export default AdminProfile;