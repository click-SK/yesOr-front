import React, {useState, useEffect} from 'react';

const UserDocument = ({setIsOpen}) => {
    const [imgProject, setImgProject] = useState([
        '/file/proj/1.png',
        '/file/proj/2.png',
        '/file/proj/3.png',
        '/file/proj/4.png',
        '/file/proj/5.png',
    ])

    return (
        <div className='modal_wrap'>
            <div className='item_body pad'>
                {imgProject.map((item,idx) => (
                    <img key={idx} src={item} alt="" />
                ))}
                <button onClick={() => setIsOpen(state => !state)}>Close</button>
            </div>
        </div>
    );
};

export default UserDocument;