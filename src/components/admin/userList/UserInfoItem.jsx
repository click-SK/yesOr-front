import React, { useState } from 'react';
import UserAllProjects from './UserAllProjects';

const UserInfoItem = ({setIsOpen,isOpenInfoUser,item}) => {
    const [isOpenAllProjects, setIsOpenAllProjects] = useState(false)
    console.log('item', item);
    return (
        <div className={`item_info_wrapper ${isOpenInfoUser ? 'item_info_wrapper-open' : '' }`}>
            <div className='info_curent_user'>
                <h4>{item.firstName + item.lastName}</h4>
                <p>Email : <span>{item.email}</span></p>
                <p>Phone: <span>{item.phone}</span></p>
                <p>Social Network: <span>{item.socialNetwork}</span></p>
                <p>Verified: <span>{item.isVerified ? 'Yes' : 'No'}</span></p>
            </div>
            <div>
                <button onClick={() => setIsOpenAllProjects(!isOpenAllProjects)}>All projects</button>
                { isOpenAllProjects && 
                <UserAllProjects
                projects = {item.projects}
                setIsOpen = {setIsOpenAllProjects}
                />}
            </div>
        </div>
    );
};

export default UserInfoItem;