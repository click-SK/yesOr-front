
import React from 'react';
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
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/new-project' element={<NewProject/>}/>
          <Route path='/rules' element={<RulesProject/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path='/admin-profile' element={<AdminProfile/>}/>
        </Routes>
      <Footer/>

    </div>
  );
}

export default App;
