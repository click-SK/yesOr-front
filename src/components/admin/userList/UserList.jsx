import React, {useState} from 'react';
import ModalProjectConfirm from '../ModalProjectConfirm';
import UserItem from './UserItem';

const UserList = ({projectArr, isOpen}) => {
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalUnConfirm, setIsOpenModalUnConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Додали стан для відстеження обраного користувача

  const confirm = 'Confirm Verification?';
  const unConfirm = 'Are you sure you want to delete the request??';

    const userArr = [
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Alex A',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 0,
            name: 'Alex Asd',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '2000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 0,
            name: 'Alex Aaas',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '13140$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Pro asd',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1012300$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            verif: 1,
            name: 'Proj sting',
            categories:'Lorem ipsum ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '100110$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        

    ]

    const [openStates, setOpenStates] = useState(Array(userArr.length).fill(false));

    
    const handleToggle = (index) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };

    return (
<div className='project_wrap'>
            <div className='project_header'>
                {/* <h4>Full name</h4> */}
                <h4></h4>
            </div>
            {userArr.map((item,idx) => (
                <div
                onClick={() => handleToggle(idx)}
                className='project_item admin_project_item' key={idx}>  
                    <img src={item.img} alt="" />                  
                    <p>{item.name}</p>

                    <div className='admin_project_item_svg'>
                        <img src="./icons/ph_chat-centered-dots-light.svg" alt="" />
                                {!isOpen && 
                                    <img 
                                    onClick={() => setIsOpenModalConfirm(!isOpenModalConfirm)}
                                    src="./icons/ph_info-light.svg" alt="" />
                                }                
                        <img 
                        onClick={() => setIsOpenModalUnConfirm(!isOpenModalUnConfirm)}
                        src="./icons/delete.svg" alt="" />
                    </div>
                    {openStates[idx] &&
                        <UserItem
                            img = {item.img}
                        />
                    
                    }
                </div>
            ))}
            <ModalProjectConfirm
            title={confirm}
            isOpenModal={isOpenModalConfirm}
            setIsOpen = {setIsOpenModalConfirm}
            />
            <ModalProjectConfirm
            title={unConfirm}
            isOpenModal={isOpenModalUnConfirm}
            setIsOpen = {setIsOpenModalUnConfirm}
            />
            
        </div>
    );
};

export default UserList;