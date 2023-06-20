import React from 'react';
import '../styles/footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='row_top'>
                <div className='logo_footer'>
                    <img src="./logo192.png" alt="" />
                </div>
                <nav className='nav_footer'>
                    <ul className='nav_list nav_list_footer'>
                        <li className='nav_list_item'><a href="#about_us">About us</a></li>
                        <li className='nav_list_item'>Projects</li>
                        <li className='nav_list_item'>Categories</li>
                        <li className='nav_list_item'>Team</li>
                        <li className='nav_list_item'>Information</li>
                    </ul>
                </nav>
                <div className='social'>
                    <img src="./icons/ph_telegram-logo-thin.svg" alt="" />
                    <img src="./icons/openmoji_instagram.svg" alt="" />
                    <img src="./icons/twiter.svg" alt="" />
                </div>
            </div>
            <div className='row_bottom'>
                <p>Copyright 2023 © All right reserved</p>
            </div>
        </div>
    );
};

export default Footer;