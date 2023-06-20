
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import MainPage from './components/mainPage/MainPage'
import Footer from './components/Footer';
import LoginForm from './components/login/LoginForm';
import ProfilePage from './components/profile/ProfilePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
      <Footer/>

    </div>
  );
}

export default App;
