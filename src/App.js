
import React, {useEffect, useState} from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import AlternateHeader from './components/AlternateHeader';
import MainPage from './components/mainPage/MainPage'
import Footer from './components/Footer';
import LoginForm from './components/login/LoginForm';
import ProfilePage from './components/profile/ProfilePage';
import NewProject from './components/project/NewProject';
import RulesProject from './components/project/RulesProject';
import AdminLogin from './components/admin/AdminLogin';
import AdminProfile from './components/admin/AdminProfile';
import ProjectAllList from './components/project/ProjectAllList';
import ProjectOne from './components/project/ProjectOne';
import { checkAuthUser } from './store/authUser';
import { checkAuthAdmin } from './store/authAdmin';
import { useDispatch, useSelector } from 'react-redux';
import ChatIcon from './components/chat/ChatIcon';
import ChatWrap from './components/chat/ChatWrap';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState(false);
  const isAuthUser = useSelector((state) => state.authUser.isAuthUser);
  const isAdmin = useSelector((state) => state.authAdmin.isAdmin);
  const admin = useSelector((state) => state.authAdmin.user);
  const location = useLocation();
  const {user} = useSelector((state) => state.authUser.user);
  const isHomePage = location.pathname === '/';
  const [isOpenChat, setIsOpenChat] = useState(false)

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

  useEffect(() => {
    if(animation){
      setIsOpenChat(true);
    } else {
      const timeoutId = setTimeout(() => {
        setIsOpenChat(false);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [animation]);



  return (
    <div className="App">
      {/* <Header/> */}
      {/* <Header/> */}

      {isAuthUser && 
        <>
        <ChatIcon isOpen={animation} setIsOpen={setAnimation} />
        {isOpenChat && <ChatWrap
          isOpen={isOpenChat}
          setIsOpen={setIsOpenChat}
          user={user}
          isUser={true}
          isAdmin={false}
          animation={animation}
          setAnimation={setAnimation}
        />}
        </>
      }

      {isHomePage ? <Header /> : <AlternateHeader />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* {!isAuthUser && <Route path='/login' element={<LoginForm/>}/>} */}
        <Route path="/login" element={<LoginForm />} />
        {!isAuthUser && <Route path="/login" element={<LoginForm />} />}
        {isAuthUser && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/rules" element={<RulesProject />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/discover" element={<ProjectAllList />} />
        <Route path="/project/:id" element={<ProjectOne />} />
        {isAdmin && <Route path="/admin-profile" element={<AdminProfile />} />}
        {/* <Route path='/admin-profile' element={<AdminProfile/>}/> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
