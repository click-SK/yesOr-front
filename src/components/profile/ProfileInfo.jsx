import React, {useState, useRef} from 'react';
import SettingPrifile from './SettingPrifile';
import '../../styles/loginForm.scss';
import { logout } from '../../store/authUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../http/baseUrl';
import axios from 'axios';
const ProfileInfo = ({openSetting, currentUser}) => {
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputFileRef = useRef(null);

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

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

// const handleUploadDocuments = () => {
//     try {
//         const formData = new FormData();
//         formData.append("userDocuments", images);
//         axios.patch(`${BASE_URL}/upload-user-document`, formData)
//     } catch(error) {
//         console.log(error);
//     }
//   }

const handleUploadDocuments = () => {
    try {
      const formData = new FormData();
      formData.append("id", user._id);
      images.forEach((image, index) => {
        console.log('imagesss',image);
        formData.append(`userDocuments`, image);
      });
      axios.patch(`${BASE_URL}/upload-user-document`, formData).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
  
    } catch (error) {
      console.log(error);
    }
  }

const handleImageChange = (e) => {
    try {
        const files = e.target.files;
        const imagesArray = Array.from(files);
        setImages(imagesArray);
    } catch(error) {
        console.log(error);
    }
  };

    console.log('user',user);
    return (
      <div className="profile_user_wrap">
        <div className="photo_profile">
          <img className="photo_profile_hero" src={`${BASE_URL}${currentUser.userImage}`} alt="" />
        </div>
        <div className="content">
          <div className="user_info">
            <h2>{currentUser.firstName}</h2>
            <p>{currentUser.email}</p>
            <p>{currentUser.phone}</p>
            {currentUser.isVerified 
            ?
            <p style={{color: 'green'}}>Verified</p> 
            :
            <p style={{color: 'red'}}>Not verified</p> }
            <button onClick={() => openSetting()}>Edite</button>
            <input
              type="file"
              name="img"
              onChange={handleImageChange}
              ref={inputFileRef}
              hidden
              multiple
            />
            <button onClick={() => inputFileRef.current.click()} className={images.length != 0 ? 'success' : ''}> {images.length != 0 ? 'Documents uploaded' : 'Upload documents'}</button>
            {images.length != 0 && <button onClick={handleUploadDocuments}>Add Documents</button>}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    );
};

export default ProfileInfo;