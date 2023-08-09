
import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
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
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuthUser = useSelector((state) => state.authUser.isAuthUser);
  const isAdmin = useSelector((state) => state.authAdmin.isAdmin);

  // console.log('isAuthUser',isAuthUser);

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
  return (
    <div className="App">
      <Header/>
      <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          {/* {!isAuthUser && <Route path='/login' element={<LoginForm/>}/>} */}
          <Route path='/login' element={<LoginForm/>}/>
          {!isAuthUser && <Route path='/login' element={<LoginForm/>}/>}
          {isAuthUser && <Route path='/profile' element={<ProfilePage/>}/>}
          <Route path='/new-project' element={<NewProject/>}/>
          <Route path='/rules' element={<RulesProject/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path='/discover' element={<ProjectAllList/>}/>
          <Route path='/project/:id' element={<ProjectOne/>}/>
          {isAdmin && <Route path='/admin-profile' element={<AdminProfile/>}/>}
          {/* <Route path='/admin-profile' element={<AdminProfile/>}/> */}
        </Routes>
      <Footer/>

    </div>
  );
}

export default App;
