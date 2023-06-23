import React, {useState} from 'react';
import ModalProjectConfirm from './ModalProjectConfirm';

const AllProjectAdmin = ({projectArr, isOpen}) => {

    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
    const [isOpenModalUnConfirm, setIsOpenModalUnConfirm] = useState(false)

    const confirm = 'Confirm Verification?'
    const unConfirm = 'Are you sure you want to delete the request??'
    console.log(isOpenModalConfirm);

    return (
        <div className='project_wrap'>
            <div className='project_header'>
                <h4>Name/Company</h4>
                <h4>Сategory</h4>
                <h4>Main info</h4>
                <h4>Budget</h4>
                <h4></h4>
            </div>
            {projectArr.map((item,idx) => (
                <div
                className='project_item admin_project_item' key={idx}>                    
                    <p>{item.name}</p>
                    <p>{item.categories}</p>
                    <p>{item.mainInfo}</p>
                    <p>{item.budget}</p>
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

export default AllProjectAdmin;