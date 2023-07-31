import React, {useState, useEffect} from 'react';
import '../../styles/loginForm.scss'
import LogIn from './LogIn';
import SignUp from './SingUp';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isSingIn, setIsSingIn] = useState(false)
    const [bgRight, setBgRight] = useState('left1')
    const [nameBtn, setNameBtn] = useState('Sign up')

    const navigate = useNavigate();

    const isAuthUser = useSelector((state) => state.authUser.isAuthUser);
    console.log('isAuthUser',isAuthUser);

    useEffect(() => {
        if(isAuthUser) {
            navigate('/profile')
        }
    },[isAuthUser])

    const hendlerChangeblock = () =>{
        try {
            setIsSingIn(!isSingIn)
            setIsLogin (!isLogin)
            setBgRight('')
            if (isSingIn){
                setNameBtn('Sign up') 
            } else setNameBtn('Login') 
        } catch(error) {
            console.log(error);
        }
        }

    return (
        <div className='login_form_wrap'>
            <div 
            className={`bg_form_login ${bgRight} ${isSingIn ? 'left' : 'right'}`}
            >
                <h2>Welcome back!</h2>
                <p>Enter your personal details to get started</p>
                <button 
                 onClick={() => hendlerChangeblock()}
                className='button_second'>{nameBtn}</button>
            </div>
            <div className='desktop_wrap_form'>
                <LogIn hendlerChangeblock={hendlerChangeblock} isSingIn={isSingIn} mobile={false}/>
                <SignUp hendlerChangeblock={hendlerChangeblock} isSingIn={isSingIn} mobile={false}/>
            </div>
            <div className='mobile_form_wrap'>
                {isLogin &&
                <LogIn hendlerChangeblock={hendlerChangeblock} isSingIn={isSingIn} mobile={true}/>
                }
                {isSingIn &&
                <SignUp hendlerChangeblock={hendlerChangeblock} isSingIn={isSingIn} mobile={true}/>
                }
            </div>
        </div>
    );
};

export default LoginForm;