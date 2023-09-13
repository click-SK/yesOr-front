import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { AiOutlineSend,AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import { useSelector } from 'react-redux';
const ChatWrap = ({setIsOpen, isOpen, user, isUser, isAdmin, animation, setAnimation}) => {
    const [allMesseges, setAllMesseges] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [message, setMessage] = useState('');
    const [reloadMessage, setReloadMessage] = useState(false);
    const [firstScroll, setFirstScroll] = useState(true); // Додайте стан для першого автоматичного прокручування

    const admin = useSelector((state) => state.authAdmin.user);
    const chatContainerRef = useRef(null);



    useEffect(() => {
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                setFirstScroll(false)
            }
        },400)
    }, [isOpen]);


    useEffect(() => {
        setInterval(() => {
            setReloadMessage((state) => ! state)
        },5000)
    },[])

    useEffect(() => {
        try{
            if(user) {
                axios.get(`${BASE_URL}/get-current-messeges/${user?._id}`)
                .then((res) => setCurrentChat(res.data))
            }
        } catch(error) {
            console.log(error);
        }
    },[user, reloadMessage])

    useEffect(() => {
        setAllMesseges(currentChat?.history);
    },[currentChat])

    const handleSendMessage = () => {
        try{
            if(isUser) {
                console.log('work1');
                axios.patch(`${BASE_URL}/create-message`, {
                    userId: user?._id,
                    message
                }) .then(() => {
                    setTimeout(() => {
                        setReloadMessage((state) => !state)
                    },500)
                })
            }
            if(isAdmin) {
                console.log('work2');
                axios.patch(`${BASE_URL}/create-message`, {
                    adminId: admin?.user?._id,
                    message,
                    userId: user?._id,
                }) .then(() => {
                    setTimeout(() => {
                        setReloadMessage((state) => !state)
                    },500)
                })
            }
            setMessage('');
            const inputElement = document.querySelector('.inpute_wrap input'); // Знайдіть інпут за допомогою класу або ID
            if (inputElement) {
                inputElement.value = ''; // Скидання значення інпуту
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
      };

    //   useEffect(() => {
    //     setTimeout(() => {
    //         if (chatContainerRef.current) {
    //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //             setFirstScroll(false);
    //         }
    //     }, 500);
    // }, []);
    


    return (
        <div className={`chat_wraper ${animation ? "chat_wraper-open" : 'chat_wraper-close' }`}>
            <div className='chat_header'>
                <img src="./icons/admin.svg" alt="" />
                <div className='admin_info'>
                    <h5>{isAdmin ? user?.firstName : 'Admin'}</h5>
                    <p><span></span> Online</p>
                </div>
                <button onClick={() => setAnimation(state => !state)}><AiOutlineClose/></button>
            </div>
            <div className='chat_body'>
                <div className='massage' ref={chatContainerRef}>
                    {allMesseges && allMesseges.length != 0 && allMesseges.map((mes) => (
                        <div key={mes?._id} className={`message_item ${user?._id == mes?.user ? 'user_message' : 'admin_message'}`}>
                        <div className='icon_chat_user'>
                            {user?._id == mes?.user 
                            ? 
                            user?.userImage 
                            ?
                            <img src={`${BASE_URL}${user?.userImage}`} />
                            :
                            <img src='/icons/no-avatar.webp' />
                            :
                            <img src='/icons/no-avatar.webp'/>}
                        </div>
                        <div className='text_item_massage'>
                            {user?._id == mes?.user && <p>{user?.firstName}</p>}
                            {user?._id !== mes?.user && <p>Administration</p>}
                            <p>{mes?.message}</p>
                        </div>

                        </div>
                    ))}
                </div>
                <div className='inpute_wrap'>
                    <input type="text" placeholder='Enter your message here' 
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setMessage(e.target.value)}/>
                    <AiOutlineSend style={{cursor: 'pointer'}} onClick={handleSendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default ChatWrap;