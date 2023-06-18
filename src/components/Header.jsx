import React from 'react';
import '../styles/header.scss'


const Header = () => {
    return (
        <div className='header'>
            <div className='logo-header'>
                <img src="./logo192.png" alt="" />
            </div>
            <nav>
                <ul className='nav_list'>
                    <li className='nav_list_item'>About us</li>
                    <li className='nav_list_item'>Projects</li>
                    <li className='nav_list_item'>Categories</li>
                    <li className='nav_list_item'>Team</li>
                    <li className='nav_list_item'>Information</li>
                </ul>
            </nav>
            <div className='profile_button'>
                <button>Sign up</button>
            </div>

           
        </div>
    );
};

export default Header;