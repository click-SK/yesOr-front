import React from 'react';
import { AiOutlineSend,AiOutlineClose } from 'react-icons/ai';

const ChatWrap = ({setIsOpen, isOpen}) => {
    return (
        <div className={`chat_wraper ${isOpen ? "chat_wraper-open" : 'chat_wraper-close' }`}>
            <div className='chat_header'>
                <img src="./icons/admin.svg" alt="" />
                <div className='admin_info'>
                    <h5>Admin</h5>
                    <p><span></span> Online</p>
                </div>
                <button onClick={() => setIsOpen(state => !state)}><AiOutlineClose/></button>
            </div>
            <div className='chat_body'>
                <div className='massage'></div>
                <div className='inpute_wrap'>
                    <input type="text" placeholder='Enter your message here' />
                    <AiOutlineSend/>
                </div>
            </div>
        </div>
    );
};

export default ChatWrap;