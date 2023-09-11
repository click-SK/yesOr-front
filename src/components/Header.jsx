import React, {useState, useEffect} from 'react';
import '../styles/header.scss'
import { Link } from "react-router-dom";
import { checkAuthUser } from '.././store/authUser';
import { checkAuthAdmin } from '.././store/authAdmin';
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {
    const [isOpenBurger, setIsOpenBurger] = useState(false)
    const [isClose, setIsClose] = useState(true);
    const [isChaked, setIsChaked] = useState(false);
    const [i, setI] = useState(0);
    const dispatch = useDispatch();
    const isAuthUser = useSelector((state) => state.authUser.isAuthUser);
    const isAdmin = useSelector((state) => state.authAdmin.isAdmin);

    useEffect(() => {
      if(localStorage.getItem('Y-R-U-T')) {
        setTimeout(() => {
          dispatch(checkAuthUser())
        },500)
      }
      if(localStorage.getItem('Y-R-A-T')) {
        setTimeout(() => {
          dispatch(checkAuthAdmin())
        },500)
      }
    },[])
    
    const hendlerOpenMenu = () =>{
        setIsOpenBurger(!isOpenBurger);
        setIsChaked(!isChaked)
       }
    
       const hendlerMenuClose = () =>{
        setIsOpenBurger(!isOpenBurger);
        setIsChaked(!isChaked);
       }

       useEffect(() => {
        if (isOpenBurger) {
          setIsClose(false);
        } else {
          const timeoutId = setTimeout(() => {
            setIsClose(true);
          }, 800);
      
          return () => clearTimeout(timeoutId); // Очистка таймера при зміні isOpenNav
        }
      }, [isOpenBurger]);

      useEffect(() => {
        if (isOpenBurger) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'visible';
        }
      }, [isOpenBurger]);

    return (
        <div className='header'>
            <div className='logo-header'>
                <Link to='/'><img src="./logo192.png" alt="" /></Link> 
            </div>
            <div  className="burger_icon">
          <label htmlFor="check">
        <input
        onChange={() => hendlerOpenMenu() }
        type="checkbox" id="check"
        checked={isChaked} />
        <span></span>
        <span></span>
        <span></span>
      </label>
      </div>
            <div className='nav_wrap '>
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
                    
                                <Link to='/login'>                              
                                {isAuthUser ?
                                <img src="./icons/Profile.svg" alt="" />
                                :
                                <button>Sign up</button>
                                }</Link>  
                </div>
            </div>
            {isOpenBurger && 
                <div id={`${isClose ? 'closed_anim' : ''}`} className={`nav_wrap_burger ${isOpenBurger? 'active_menu' : `not_active_menu`} `}>
                        <div className='logo-header logo_burger'>
                            <Link to='/'><img src="./logo192.png" alt="" /></Link> 
                        </div>
                    <nav>
                        <ul className='nav_list nav_list_burger '>
                            <li
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'><a href="#about_us">About us</a></li>
                            <li
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'><a href="#project">Projects</a></li>
                            <li 
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'><a href="#categories">Categories</a></li>
                            <li 
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'><a href="#team">Team</a></li>
                            <li 
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'><a href="#information">Information</a></li>
                        </ul>
                    </nav>
                    <div className='profile_button'>
                            <Link to='/login'>                              
                                {isAuthUser ?
                                <img src="./icons/Profile.svg" alt="" />
                                :
                                <button>Sign up</button>
                                }</Link> 
                    </div>
                    <div className='social'>
                    {/* <img src="./icons/ph_telegram-logo-thin-burger.svg" alt="" />
                    <img src="./icons/openmoji_instagram-burger.svg" alt="" />
                    <img src="./icons/twiter-burger.svg" alt="" /> */}
                </div>
                </div>
            }
          
        </div>
    );
};

export default Header;