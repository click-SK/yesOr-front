import React from 'react';
import '../../styles/chat.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';

const ChatIcon = ({setIsOpen, isOpen}) => {
    const {user} = useSelector((state) => state.authUser.user);
    const handleCreateOrOpenChat = () => {
            setIsOpen(state => !state)
            axios.post(`${BASE_URL}/create-messanger`, {
                userId: user._id
            }).catch((error) => {
                console.log('Request error',error);
            })
    }
    return (
        <div 
        className='chat_icon_wrap'
        onClick={() => handleCreateOrOpenChat()}>
            <div className='chat_bg_z1000'>
                <div className='chat_bg_z1999'>
                    <div className='chat_bg_z2999'>
                        <img className='chat_icon' src="./mainPage/icons/fluent_chat-24-regular.svg" alt=""/>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ChatIcon;