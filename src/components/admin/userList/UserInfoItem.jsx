import React from 'react';

const UserInfoItem = ({setIsOpen,isOpenInfoUser}) => {

    console.log('setIsOpen', setIsOpen);
    return (
        <div className={`item_info_wrapper ${isOpenInfoUser ? 'item_info_wrapper-open' : '' }`}>
        
            <h2>hello</h2>
        </div>
    );
};

export default UserInfoItem;