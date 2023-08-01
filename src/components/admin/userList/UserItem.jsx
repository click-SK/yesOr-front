import React from 'react';

const UserItem = ({img}) => {
    return (
        <div className='user_wrap'>
            <div className='wrap_user-content'>
              <img src={img} alt="" />    
              <img src={img} alt="" />    
              <img src={img} alt="" />    
              <img src={img} alt="" />    
              <img src={img} alt="" />
            </div>
        </div>
    );
};

export default UserItem;