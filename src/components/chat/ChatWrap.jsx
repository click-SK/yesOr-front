// import React, {useState, useEffect} from 'react';
// import { AiOutlineSend,AiOutlineClose } from 'react-icons/ai';
// import axios from 'axios';
// import { BASE_URL } from '../../http/baseUrl';
// import { useSelector } from 'react-redux';
// const ChatWrap = ({setIsOpen, isOpen, user, isUser, isAdmin}) => {
//     const [allMesseges, setAllMesseges] = useState([]);
//     const [currentChat, setCurrentChat] = useState([]);
//     const [message, setMessage] = useState([]);
//     const [reloadMessage, setReloadMessage] = useState([]);

//     const admin = useSelector((state) => state.authAdmin.user);

//     useEffect(() => {
//         setInterval(() => {
//             setReloadMessage((state) => ! state)
//         },5000)
//     },[])

//     useEffect(() => {
//         try{
//             if(user) {
//                 axios.get(`${BASE_URL}/get-current-messeges/${user?._id}`)
//                 .then((res) => setCurrentChat(res.data))
//             }
//         } catch(error) {
//             console.log(error);
//         }
//     },[user, reloadMessage])

//     useEffect(() => {
//         setAllMesseges(currentChat?.history);
//     },[currentChat])

//     const handleSendMessage = () => {
//         try{
//             if(isUser) {
//                 console.log('work1');
//                 axios.patch(`${BASE_URL}/create-message`, {
//                     userId: user?._id,
//                     message
//                 }) .then(() => {
//                     setTimeout(() => {
//                         setReloadMessage((state) => !state)
//                     },500)
//                 })
//             }
//             if(isAdmin) {
//                 console.log('work1');
//                 axios.patch(`${BASE_URL}/create-message`, {
//                     adminId: admin?.user?._id,
//                     message,
//                     userId: user?._id,
//                 }) .then(() => {
//                     setTimeout(() => {
//                         setReloadMessage((state) => !state)
//                     },500)
//                 })
//             }
//         } catch(error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className={`chat_wraper ${isOpen ? "chat_wraper-open" : 'chat_wraper-close' }`}>
//             <div className='chat_header'>
//                 <img src="./icons/admin.svg" alt="" />
//                 <div className='admin_info'>
//                     <h5>Admin</h5>
//                     <p><span></span> Online</p>
//                 </div>
//                 <button onClick={() => setIsOpen(state => !state)}><AiOutlineClose/></button>
//             </div>
//             <div className='chat_body'>
//                 <div className='massage'>
//                     {allMesseges && allMesseges.length != 0 && allMesseges.map((mes) => (
//                         <div key={mes?._id} className={user?._id == mes?.user ? 'user_message' : 'admin_message'}>
//                         <div style={{width: '50px', height:'50px'}}>
//                             <img src='/icons/no-avatar.webp' style={{width: '100%', height: '100%'}}/>
//                         </div>
//                         <div>
//                             <p>{mes?.message}</p>
//                         </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className='inpute_wrap'>
//                     <input type="text" placeholder='Enter your message here' onChange={(e) => setMessage(e.target.value)}/>
//                     <AiOutlineSend style={{cursor: 'pointer'}} onClick={handleSendMessage}/>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatWrap;
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSend,AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import { useSelector } from 'react-redux';
const ChatWrap = ({setIsOpen, isOpen, user, isUser, isAdmin}) => {
    const [allMesseges, setAllMesseges] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [message, setMessage] = useState([]);
    const [reloadMessage, setReloadMessage] = useState([]);

    const admin = useSelector((state) => state.authAdmin.user);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [allMesseges]);

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
                console.log('work1');
                axios.patch(`${BASE_URL}/create-message`, {
                    adminId: admin?.user?._id,
                    message,
                    userId: user?._id,
                }) .then(() => {
                    setMessage('')
                    setTimeout(() => {
                        setReloadMessage((state) => !state)
                    },500)
                })
            }
        } catch(error) {
            console.log(error);
        }
    }

    console.log('currentChat',currentChat);

    return (
        <div className={`chat_wraper ${isOpen ? "chat_wraper-open" : 'chat_wraper-close' }`} ref={chatContainerRef}>
            <div className='chat_header'>
                <img src="./icons/admin.svg" alt="" />
                <div className='admin_info'>
                    <h5>Admin</h5>
                    <p><span></span> Online</p>
                </div>
                <button onClick={() => setIsOpen(state => !state)}><AiOutlineClose/></button>
            </div>
            <div className='chat_body'>
                <div className='massage'>
                    {allMesseges && allMesseges.length != 0 && allMesseges.map((mes) => (
                        <div key={mes?._id} className={`message_item ${user?._id == mes?.user ? 'user_message' : 'admin_message'}`}>
                        <div>
                            <p>Username</p>
                        </div>
                        <div style={{width: '50px', height:'50px'}}>
                            <img src='/icons/no-avatar.webp' style={{width: '100%', height: '100%'}}/>
                        </div>
                        <div>
                            <p>{mes?.message}</p>
                        </div>
                        </div>
                    ))}
                </div>
                <div className='inpute_wrap'>
                    <input type="text" placeholder='Enter your message here' onChange={(e) => setMessage(e.target.value)}/>
                    <AiOutlineSend style={{cursor: 'pointer'}} onClick={handleSendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default ChatWrap;