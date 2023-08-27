import React from 'react';
import '../../styles/chat.scss'

const ChatIcon = ({setIsOpen, isOpen}) => {
    return (
        <div 
        className='chat_icon_wrap'
        onClick={() => setIsOpen(state => !state)}>
            <div className='chat_bg_z1000'>
                <div className='chat_bg_z1999'>
                    <div className='chat_bg_z2999'>
                        <img className='chat_icon' src="./icons/fluent_chat-24-regular.svg" alt="" />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ChatIcon;