import React, {useState} from 'react';

const ModalProjectConfirm = ({isOpenModal, setIsOpen, title}) => {

    return (
        <>
            {isOpenModal &&
                <div className='modal_wrap'>
                    <div className='item_body'>
                        <h4>{title}</h4>
                        <div className='button_wrap'>
                            <button
                            onClick={() => setIsOpen(!setIsOpen)}
                            >Yes</button>
                            <button
                             onClick={() => setIsOpen(!setIsOpen)}
                            >No</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ModalProjectConfirm;