import React from 'react';

const SavedProject = () => {

    const projectArr = [
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },
        {
            img: './file/foto1.png ',
            info: 'Lorem ipsum dolor sit amet consectetur.',
            budget: '1000$',
            mainInfo: 'Lorem ipsum dolor sit amet consectetur. '
        },

    ]

    return (
        <div className='project_wrap'>
            <div className='project_wrap_header'> 
                <p>Info</p>
                <p>Budget</p>
                <p>Main info</p>
             </div>
            {projectArr.map((item,idx) => (
                <div className='project_item' key={idx}>
                    <img src={item.img} alt="itemimg" />
                    <p>{item.info}</p>
                    <p>{item.budget}</p>
                    <p>{item.mainInfo}</p>
                </div>
            ))}
        </div>
    );
};

export default SavedProject;