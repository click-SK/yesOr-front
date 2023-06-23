import React, {useState} from 'react';
import '../../styles/loginForm.scss'
import { Link } from "react-router-dom";

const AdminLogin = () => {
    return (
        <div className='login_form_wrap'>
            <div 
            style={{right: '0px'}}
            className={`bg_form_login`}
            
            >
                <h2
                style={{fontSize:'56px'}}
                >Welcome back!</h2>
                {/* <p>Enter your personal details to get started</p>
                <button 
                 
                className='button_second'>Login</button> */}
            </div>
            <div className='form_wrap_item log_in_form'>
                <div className='form_title'>
                        <h3 className='active_form'>Login</h3>
                </div>
                <div className='input_wrap'>
                    <div className='input_item'>
                        <label htmlFor="email">Email*</label>
                        <input id='email' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="password">Password*</label>
                        <input id='password' type="password" />
                    </div>
                </div>
                    <div className='input_checkbox_wrap input_checkbox_wrap-item'>
                        <input className='checkbox_input' id='remember_me' type="checkbox" />
                        <label htmlFor="remember_me">Remember me</label>
                    </div>
                
               <Link className='button_login' to='/admin-profile'> <button>Login</button></Link> 
            </div>
            <div className='form_wrap_item sing_in_form'>
                {/* <div className='form_title'>
                        <h3 
                        
                        
                        >Login</h3>
                        <h3
                        className='active_form'
                        
                        >Sign up</h3>
                </div>
                <div className='input_wrap'>
                    <div className='input_item'>
                        <label htmlFor="first_name">First name*</label>
                        <input id='first_name' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="lust_name">Last name*</label>
                        <input id='lust_name' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="phone">Number phone*</label>
                        <input id='phone' type="number" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="socia">Specify a social network to contact you *</label>
                        <input id='socia' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="password1">Password *</label>
                        <input id='password1' type="password"  />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="password2">Passport *</label>
                        <input id='password2' type="password"  />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="requi">Requisites *</label>
                        <input id='requi' type="text" />
                    </div>

                </div>
                    <div className='input_checkbox_wrap'>
                        <div className='input_checkbox_wrap-item'>
                            <input className='checkbox_input' id='remember_me' type="checkbox" />
                            <label htmlFor="remember_me">Confirm user agreement</label>
                        </div>
                        <div className='input_checkbox_wrap-item'>
                            <input className='checkbox_input' id='remember_me' type="checkbox" />
                            <label htmlFor="remember_me">Send me newsletter</label>
                        </div>
                    </div>
                
                <Link className='button_singup' to='/profile'> <button>Sign up</button></Link>  */}
            </div>
        </div>
    );
};

export default AdminLogin;