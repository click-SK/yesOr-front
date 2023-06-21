import React, {useState} from 'react';
import '../../styles/loginForm.scss'

const ProfileInfo = () => {
    const [isEdit, setIsEdit] = useState(true)
    return (
        <div className='profile_user_wrap'>
            <div className='photo_profile'>
                <img src="./file/Rectangle 53.png" alt="" />
                {!isEdit &&
                    <img className='edit_photo_profile' src="./file/edit.svg" alt="" />
                }
            </div>
            <div
            className='content'
            >
                {isEdit ?
                <div className='user_info'>
                    <h2>Name</h2>
                    <p>fordtom@gmail.com</p>
                    <p>+38099 222 22 22 </p>
                    <button
                    onClick={() => setIsEdit(!isEdit)}
                    >edite</button>
                </div>
                :
                <div>
                    
                    <div className='input_wrap'>
                        <div className='input_item'>
                            <label htmlFor="first_name">First name*</label>
                            <input id='first_name' type="text" />
                        </div>
                        <div className='input_item'>
                            <label htmlFor="lust_name">Last name*</label>
                            <input id='lust_name' type="text" />
                        </div>
                        <div className='input_item'>
                            <label htmlFor="phone">Number phone*</label>
                            <input id='phone' type="number" />
                        </div>
                        <div className='input_item'>
                            <label htmlFor="socia">Specify a social network to contact you *</label>
                            <input id='socia' type="text" />
                        </div>
                        <div className='input_item'>
                            <label htmlFor="password1">Password *</label>
                            <input id='password1' type="password"  />
                        </div>
                        <div className='input_item'>
                            <label htmlFor="password2">Passport *</label>
                            <input id='password2' type="password"  />
                        </div>
                        <div className='input_item'>
                            <label htmlFor="requi">Requisites *</label>
                            <input id='requi' type="text" />
                        </div>
                    </div>
                    <button 
                    onClick={() => setIsEdit(!isEdit)}
                    >Save</button>
                </div>
                }

            </div>
            


        </div>
    );
};

export default ProfileInfo;