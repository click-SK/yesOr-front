import React, {useState} from 'react';
import SavedProject from './SavedProject';
import ProfileInfo from './ProfileInfo';
import SettingPrifile from './SettingPrifile';
import MyPriject from './MyPriject';
import '../../styles/profile.scss'

const ProfilePage = () => {
    const [isOpenProject, setIsOpenProject] = useState(true)
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    const [isOpenMyProject, setIsOpenMyProject] = useState(false)

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
            <div className='profile_title'>
                <h2>Personal area</h2>
            </div>
            <ul className='profile_nav'>
                <li
                onClick={() => openProject()}
                 className={`profile_nav_item ${isOpenProject ? 'profile_nav_item-active' : ''}`}>Saved</li>
                <li 
                onClick={() => openProfile()}
                className={`profile_nav_item ${isOpenProfile ? 'profile_nav_item-active' : ''}`}>Profile</li>
                <li 
                onClick={() => openSetting()}
                className={`profile_nav_item ${isOpenSetting ? 'profile_nav_item-active' : ''}`}>Settings</li>
                <li 
                onClick={() => openMyProject()}
                className={`profile_nav_item ${isOpenMyProject ? 'profile_nav_item-active' : ''}`}>My project</li>
            </ul>
            <div className='profile_content_wraper'>
                {isOpenProject &&
                    <SavedProject
                    />
                }
                {isOpenProfile &&
                    <ProfileInfo
                    />
                }
                {isOpenSetting &&
                    <SettingPrifile
                    />
                }
                {isOpenMyProject &&
                    <MyPriject
                    />
                }

            </div>

        </div>
    );
};

export default ProfilePage;