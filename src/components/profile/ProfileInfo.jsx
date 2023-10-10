import React from 'react';
import '../../styles/loginForm.scss';
import { logout } from '../../store/authUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../http/baseUrl';
import axios from 'axios';
const ProfileInfo = ({openSetting, currentUser}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.authUser.user);
    
    const handleLogout = () => {
        try {
          if(user) {
            dispatch(logout({accessToken: user?.accessToken}));
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            },500)
          }
        } catch(error) {
            console.log(error);
        }
    }
    return (
      <div className="profile_user_wrap">
        <div className="photo_profile">
          {currentUser?.userImage ? (
            <img
              className="photo_profile_hero"
              src={`${BASE_URL}${currentUser?.userImage}`}
              alt=""
            />
          ) : (
            <img
              className="photo_profile_hero"
              src="/icons/no-avatar.webp"
              alt=""
            />
          )}
        </div>
        <div className="content">
          <div className="user_info">
            <h2>{currentUser?.firstName}</h2>

            {currentUser?.isVerified 
            ?
            <p style={{color: 'green'}}>Verified</p> 
            :
            <p style={{color: 'red'}}>Not verified</p> }
            <p>{currentUser?.email}</p>
            <p>{currentUser?.phone}</p>
            <button className='btn_profile-edit' onClick={() => openSetting()}>Edit</button>
            <button className='btn_profile-logout' onClick={handleLogout}>Logout</button>

          </div>
        </div>
      </div>
    );
};

export default ProfileInfo;