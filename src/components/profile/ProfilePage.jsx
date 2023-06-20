import React from 'react';
import SavedProject from './SavedProject';
import '../../styles/profile.scss'

const ProfilePage = () => {
    return (
        <div className='profile_wrap'>
            <div className='profile_title'>
                <h2>Personal area</h2>
            </div>
            <ul className='profile_nav'>
                <li>Saved</li>
                <li>Profile</li>
                <li>Settings</li>
                <li>My project</li>
            </ul>
            <div className='profile_content_wraper'>
                <SavedProject/>
            </div>

        </div>
    );
};

export default ProfilePage;