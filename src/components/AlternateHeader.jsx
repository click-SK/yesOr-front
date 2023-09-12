import React, {useState, useEffect} from 'react';
import '../styles/header.scss'
import { Link, useLocation, useNavigate  } from "react-router-dom";
import ProjectAllList from './project/ProjectAllList';
import { checkAuthUser } from '.././store/authUser';
import { checkAuthAdmin } from '.././store/authAdmin';
import { useDispatch, useSelector } from 'react-redux';


const AlternateHeader = () => {
    const [isOpenBurger, setIsOpenBurger] = useState(false)
    const [isClose, setIsClose] = useState(true);
    const [isChaked, setIsChaked] = useState(false);
    const [i, setI] = useState(0);
    const dispatch = useDispatch();
    const isAuthUser = useSelector((state) => state.authUser.isAuthUser);
    const isAdmin = useSelector((state) => state.authAdmin.isAdmin);
    const location = useLocation();
  const params = new URLSearchParams(location.search);
  const scrollTarget = params.get('scroll');
  const navigate = useNavigate();

    // console.log('isAuthUser',isAuthUser);

    // useEffect(() => {
    //     if (scrollTarget === 'about_us') {
    //       const aboutUsSection = document.getElementById('about_us');
    //       if (aboutUsSection) {
    //         aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    //       }
    //     }
    //   }, [scrollTarget]);

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

      const startProjectLink = isAuthUser ? '/new-project' : '/login';

    return (
        <div className='header alternate-header '>
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
            <div className='nav_wrap nav_wrap-alter'>
            <div className='banner_head_buttons header_btn'>
                    <Link
                     to='/discover'>
                        <button>Discover</button>
                    </Link>
                    <Link to={startProjectLink}>
                        <button>Start a project</button>
                    </Link>
                </div>
                <nav>
                    <ul className='nav_list'>
                        <li className='nav_list_item'>
                            {/* <a href="#about_us">About us</a> */}
                            <Link to='/?scroll=about_us'>About us</Link>
                            </li>
                        <li className='nav_list_item'>
                            {/* <a href="#project">Projects</a> */}
                            <Link to='/discover'>All Projects</Link>
                            </li>
                        <li className='nav_list_item'>
                            {/* <a href="/?scroll=categories">Categories</a> */}
                            <Link to='/?scroll=categories'>Categories</Link>
                            </li>
                        <li className='nav_list_item'>
                            {/* <a href="/?scroll=team">Team</a> */}
                            <Link to='/?scroll=team'>Team</Link>
                            </li>
                        <li className='nav_list_item'>
                            {/* <a href="/?scroll=information">Information</a> */}
                            <Link to='/?scroll=information'>Information</Link>
                            </li>
                        <li className='nav_list_item'>
                            {/* <a href="/?scroll=information">Information</a> */}
                            <Link to='/rules'>Terms</Link>
                            </li>
                    </ul>
                </nav>
                <div className='profile_button'>
                    
                <Link to='/login'>
                                {isAuthUser ?
                                <img src="./icons/Profile.svg" alt="" />
                                :
                                <button>Sign up</button>
                                }
                            </Link>  
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
                            className='nav_list_item nav_list_burger-item'>
                            <Link to='/?scroll=about_us'>About us</Link>
                            </li>
                            <li
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'>
                            <Link to='/discover'>Projects</Link>
                            </li>
                            <li 
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'>
                            <Link to='/?scroll=categories'>Categories</Link>
                            </li>
                            <li 
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'>
                            <Link to='/?scroll=team'>Team</Link>
                            </li>
                            <li 
                            onClick={() => hendlerMenuClose() }
                            className='nav_list_item nav_list_burger-item'>
                            <Link to='/?scroll=information'>Information</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='header_btn alt_header'>
                                <Link
                                to='/discover'>
                                    <button
                                    onClick={() => hendlerMenuClose() }
                                    >Discover</button>
                                </Link>
                                <Link to={startProjectLink}>
                                  
                                    <button
                                    onClick={() => hendlerMenuClose() }
                                    >Start a project</button>
                                </Link>
                            </div>
                    <div className='profile_button'>
                            <Link to='/login'>
                                {isAuthUser ?
                                <img src="./icons/Profile.svg" alt="" 
                                onClick={() => hendlerMenuClose() }
                                />
                                :
                                <button>Sign up</button>
                                }
                            </Link> 
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

export default AlternateHeader;