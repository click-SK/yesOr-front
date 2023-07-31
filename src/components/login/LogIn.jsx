import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import FormTitle from './FormTitle';
import { login } from '../../store/authUser';
import { useDispatch } from 'react-redux';
const LogIn = ({hendlerChangeblock, isSingIn, mobile}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await dispatch(login({email, password}));
            console.log('login data',data);
            if('user' in data.payload) {
                localStorage.setItem('Y-R-U-T', data.payload.accessToken)
                navigate('/profile');
                window.location.reload();
              }
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <div className='form_wrap_item log_in_form'>
        <FormTitle hendlerChange={hendlerChangeblock} isSingIn={isSingIn}/>
        <div className='input_wrap'>
            <div className='input_item'>
                <label htmlFor="email">Email*</label>
                <input id={mobile ? 'email-login-user-mobile' : 'email-login-user'} 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='input_item'>
                <label htmlFor="password">Password*</label>
                <input id={mobile ? 'password-login-user-mobile' : 'password-login-user'} 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
            <div className='input_checkbox_wrap input_checkbox_wrap-item'>
                <input className='checkbox_input' id='remember_me' type="checkbox" />
                <label htmlFor="remember_me">Remember me</label>
            </div>
        
    <div className='button_login'> <button onClick={handleLogin}>Login</button></div> 
    </div>
    );
};

export default LogIn;