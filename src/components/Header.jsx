import React from 'react';
import '../styles/header.scss'
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div className='header'>
            <div className='logo-header'>
                <Link to='/'><img src="./logo192.png" alt="" /></Link> 
            </div>
            <nav>
                <ul className='nav_list'>
                    <li className='nav_list_item'><a href="#about_us">About us</a></li>
                    <li className='nav_list_item'><a href="#project">Projects</a></li>
                    <li className='nav_list_item'><a href="#categories">Categories</a></li>
                    <li className='nav_list_item'><a href="#team">Team</a></li>
                    <li className='nav_list_item'><a href="#information">Information</a></li>
                </ul>
            </nav>
            <div className='profile_button'>
                
                    <Link to='/login'><button>Sign up</button></Link> 
            </div>

           
        </div>
    );
};

export default Header;