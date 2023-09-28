import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='row_top'>
                <div className='logo_footer'>
                    <Link to='/'><img src="./2.png" alt="" /></Link> 
                </div>

                <nav className='nav_footer'>
                    <ul className='nav_list nav_list_footer'>
                        <li className='nav_list_item'>
                        <Link to='/?scroll=about_us'>About us</Link>
                            </li>
                        <li className='nav_list_item'>
                        <Link to='/discover'>Projects</Link>
                            </li>
                        <li className='nav_list_item'>
                        <Link to='/?scroll=categories'>Categories</Link>
                            </li>
                        <li className='nav_list_item'>
                        <Link to='/?scroll=team'>Team</Link>
                            </li>
                        <li className='nav_list_item'>
                        <Link to='/?scroll=information'>Information</Link>
                            </li>
                        <li className='nav_list_item'>
                            <Link to='/rules'>Terms</Link></li>
                    </ul>
                </nav>

            <div className='social'>
                    <a href="https://t.me/yesor_official"> 
                    {/* <img src="./icons/footer/22.png" alt="" /> */}
                    <img src="./mainPage/icons/footer/telegram.png" alt="telegram.png" />
                    </a>
                    <a href="https://www.instagram.com/yesor_official"> 
                    {/* <img src="./icons/footer/16.png" alt="" /> */}
                    <img src="./mainPage/icons/footer/insta.png" alt="instagram.png" />
                    </a>
                    <a href="https://twitter.com/YesOr_Official">
                         {/* <img src="./icons/footer/20.png" alt="" /> */}
                         <img src="./mainPage/icons/footer/twit.png" alt="twiter.png" />
                         </a> 
                    <a href="https://www.tiktok.com/@yesor_official"> 
                    {/* <img src="./icons/footer/21.png" alt="" />  </a>  */}
                    <img src="./mainPage/icons/footer/tick.png" alt="tiktok.png" />  </a> 
                    <a href="https://www.facebook.com/profile.php?id=61550656619878"> 
                    {/* <img src="./icons/footer/19.png" alt="" /></a>  */}
                    <img src="./mainPage/icons/footer/face.png" alt="face.png" /></a> 
                    <a href="tel:+380974499349"> 
                    {/* <img src="./icons/footer/18.png" alt="" /> </a>  Здійснення дзвінка */}
                    <img src="./mainPage/icons/footer/phone.png" alt="phone.png" /> </a>  {/* Здійснення дзвінка */}
                    <a href="mailto:yesor.official@gmail.com"> 
                    {/* <img src="./icons/footer/17.png" alt="" /> </a>  Відкриття пошти */}
                    <img src="./mainPage/icons/footer/gmail.png" alt="gmail.png" /> </a>  {/* Відкриття пошти */}

                </div>
            </div>
            <div className='row_bottom'>
                <p>Copyright 2023 © All right reserved</p>
            </div>
        </div>
    );
};

export default Footer;