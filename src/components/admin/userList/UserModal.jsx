import React from 'react';
import { BASE_URL } from '../../../http/baseUrl';
const UserModal = ({ isOpen, setIsOpen, documents, name }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal">
        <div>
          <button style={{color: 'black'}} onClick={() => setIsOpen(!isOpen)}>Close</button>
        </div>
        <div className='user_modal_image_block'>
          {documents ? documents.map((img, idx) => (
            <div className='user_modal_image_wrap' key={idx}>
            <img className='user_modal_image' src={`${BASE_URL}${img}`}/>
            </div>
          ))
        :
        <p>No documents are attached</p>
        }
        </div>
        </div>
      </div>
    );
};

export default UserModal;