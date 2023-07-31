import React, {useState,useEffect} from 'react';
import '../../styles/loginForm.scss'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authAdmin';
const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdmin = useSelector((state) => state.authAdmin.isAdmin);

    useEffect(() => {
        if(isAdmin) {
            navigate('/admin-profile')
        }
    },[isAdmin])

    const handleLogin = async () => {
        try {
            const data = await dispatch(login({email, password}))
            if('user' in data.payload) {
                localStorage.setItem('Y-R-A-T', data.payload.accessToken)
                navigate('/admin-profile');
                window.location.reload();
              }
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <div className='login_form_wrap'>
            <div 
            style={{right: '0px'}}
            className={`bg_form_login`}
            
            >
                <h2
                style={{fontSize:'56px'}}
                >Welcome back!</h2>
            </div>
            <div className='form_wrap_item log_in_form'>
                <div className='form_title'>
                        <h3 className='active_form'>Login</h3>
                </div>
                <div className='input_wrap'>
                    <div className='input_item'>
                        <label htmlFor="email">Email*</label>
                        <input id='email-login-admin' 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='input_item'>
                        <label htmlFor="password">Password*</label>
                        <input id='password-admin' 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                    <div className='input_checkbox_wrap input_checkbox_wrap-item'>
                        <input className='checkbox_input' id='remember_me' type="checkbox" />
                        <label htmlFor="remember_me">Remember me</label>
                    </div>
                
               <div className='button_login' to='/admin-profile'> <button onClick={handleLogin}>Login</button></div> 
            </div>
            <div className='form_wrap_item sing_in_form'>
            </div>
        </div>
    );
};

export default AdminLogin;