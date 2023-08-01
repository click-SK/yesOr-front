import React, {useState} from 'react';
import SettingPrifile from './SettingPrifile';
import '../../styles/loginForm.scss';
import { logout } from '../../store/authUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../http/baseUrl';
const ProfileInfo = ({openSetting}) => {
    const [isEdit, setIsEdit] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.authUser.user);

    console.log('user.accessToken',user.accessToken);

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

    console.log('user',user);
    return (
        <div className='profile_user_wrap'>
            <div className='photo_profile'>
                <img src={`${BASE_URL}${user.userImage}`} alt="" />
            </div>
            <div
            className='content'
            >
                <div className='user_info'>
                    <h2>{user.firstName}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <button
                    onClick={() => openSetting()}
                    >Edite</button>
                    <button
                    onClick={handleLogout}
                    >Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;