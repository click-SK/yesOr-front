import React, {useState} from "react";
import FormTitle from "./FormTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registration } from "../../store/authUser";
import { useDispatch } from "react-redux";
import * as validator from "../../validation/validator.js";
import ErrorMessage from "../validation/ErrorMessage";
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
const SingUp = ({ hendlerChangeblock, isSingIn, mobile}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [socialNetwork, setSocialNetwork] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [secondPasswordErrorMessage, setSecondPasswordErrorMessage] = useState('');
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [userAgreement, setUserAgreement] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegistration = async () => {
    try {
      const resoult = validator.validationRegistration({ email, password, phone, firstName, lastName, socialNetwork, secondPassword});
      let isValid = false;
      if(resoult.length == 0) {
        isValid = true;
      } else {
        resoult.forEach((item) => {
          item.reason == 'email' && setEmailErrorMessage(item?.error);
          item.reason == 'password' && setPasswordErrorMessage(item.error);
          item.reason == 'secondPassword' && setSecondPasswordErrorMessage(item.error);
          item.reason == 'phone' && setPhoneErrorMessage(item.error);
          item.reason == 'lastName' && setLastNameErrorMessage(item.error);
          item.reason == 'firstName' && setFirstNameErrorMessage(item.error);
        })
      }

      if(isValid && userAgreement) {
      const data = await dispatch(registration({email, password, firstName, lastName, phone, socialNetwork}));
      if('user' in data.payload) {
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        window.localStorage.setItem('Y-R-U-T', data.payload.accessToken);
        navigate('/profile');
        window.location.reload();
      } else {
        alert(data.payload.message)
      }
      } 
    } catch(error) {
      console.log(error);
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordRepeat = () => {
    setShowPasswordRepeat(!showPasswordRepeat);
  };

  //--Valodation functions

  const handleEmail = (e) => {
    setEmail(e);
    if(e != '') {
      handleValidateEmail(e);
    } else {
      setEmailErrorMessage('');
    }
  }

  const handleValidateEmail = (e) => {
    const resoult = validator.validationRegistration({email: e});

    if(resoult.length !== 0) {
      resoult.forEach((item) => {
        item.reason == 'email' ? setEmailErrorMessage(item.error) : setEmailErrorMessage('');
      })
    }
  }
  const handleFirstName = (e) => {
    setFirstName(e);
    if(e != '') {
      handleValidateFirstName(e);
    } else {
      setFirstNameErrorMessage('');
    }
  }

  const handleValidateFirstName = (e) => {
    const resoult = validator.validationRegistration({firstName: e});

    if(resoult.length !== 0) {
      resoult.forEach((item) => {
        item.reason == 'firstName' ? setFirstNameErrorMessage(item.error) : setFirstNameErrorMessage('');
      })
    }
  }
  const handleLastName = (e) => {
    setLastName(e);
    if(e != '') {
      handleValidateLastName(e);
    } else {
      setLastNameErrorMessage('');
    }
  }

  const handleValidateLastName = (e) => {
    const resoult = validator.validationRegistration({lastName: e});

    if(resoult.length !== 0) {
      resoult.forEach((item) => {
        item.reason == 'lastName' ? setLastNameErrorMessage(item.error) : setLastNameErrorMessage('');
      })
    }
  }

  const handlePhone = (e) => {
    setPhone(e);
    if(e != '') {
      handleValidatePhone(e);
    } else {
      setPhoneErrorMessage('');
    }
  }

  const handleValidatePhone = (e) => {
    const resoult = validator.validationRegistration({phone: e});

    if(resoult.length !== 0) {
      resoult.forEach((item) => {
        item.reason == 'phone' ? setPhoneErrorMessage(item.error) : setPhoneErrorMessage('');
      })
    }
  }
  const handlePassword = (e) => {
    setPassword(e);
    if(e != '') {
      handleValidatePassword(e);
    } else {
      setPasswordErrorMessage('');
    }
  }

  const handleValidatePassword = (e) => {
    const resoult = validator.validationRegistration({password: e});

    if(resoult.length !== 0) {
      resoult.forEach((item) => {
        item.reason == 'password' ? setPasswordErrorMessage(item.error) : setPasswordErrorMessage('');
      })
    }
  }
  const handleSecondPassword = (e) => {
    setSecondPassword(e);
    if(e != '') {
      handleValidateSecondPassword(e);
    } else {
      setSecondPasswordErrorMessage('');
    }
  }

  const handleValidateSecondPassword = (e) => {
    const resoult = validator.validationRegistration({secondPassword: e, password});

    if(resoult.length !== 0) {
      resoult.forEach((item) => {
        item.reason == 'secondPassword' ? setSecondPasswordErrorMessage(item.error) : setSecondPasswordErrorMessage('');
      })
    }
  }
  
  return (
    <div className="form_wrap_item sing_in_form">
      <div className="input_wrap">
        <FormTitle hendlerChange={hendlerChangeblock} isSingIn={isSingIn}/>
        <div className='input_item'>
                <label htmlFor="email">Email*</label>
                <input id={mobile ? 'email-sigin-user-mobile' : 'email-sigin-user'} 
                type="text" 
                value={email}
                onChange={(e) => handleEmail(e.target.value)}/>
            <ErrorMessage errorMessage={emailErrorMessage}/>
            </div>
        <div className="input_item">
          <label htmlFor="first_name">First name *</label>
          <input id="first_name" 
          type="text" 
          value={firstName}
          onChange={(e) => handleFirstName(e.target.value)}/>
        <ErrorMessage errorMessage={firstNameErrorMessage}/>
        </div>
        <div className="input_item">
          <label htmlFor="lust_name">Last name *</label>
          <input id="lust_name" 
          type="text" 
          value={lastName}
          onChange={(e) => handleLastName(e.target.value)}/>
        <ErrorMessage errorMessage={lastNameErrorMessage}/>
        </div>
        <div className="input_item">
          <label htmlFor="phone">Phone*</label>
          <input id="phone" 
          type="phone" 
          value={phone}
          onChange={(e) => handlePhone(e.target.value)}/>
        <ErrorMessage errorMessage={phoneErrorMessage}/>
        </div>
        <div className="input_item">
          <label htmlFor="socia">
            Specify a social network to contact you
          </label>
          <input id="socia" 
          type="text"
          value={socialNetwork}
          onChange={(e) => setSocialNetwork(e.target.value)}/>
        </div>
            <div className="input_item">
      <label htmlFor="password1">Password *</label>
      <div className="password_input_container">
        <input
          id="password1"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />
        <div className="password_toggle_icon" onClick={toggleShowPassword}>
          {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
        </div>
      </div>
        <ErrorMessage errorMessage={passwordErrorMessage}/>
    </div>
        <div className="input_item">
      <label htmlFor="password2">Repeat password *</label>
      <div className="password_input_container">
        <input
          id="password2"
          type={showPasswordRepeat ? 'text' : 'password'}
          value={secondPassword}
          onChange={(e) => handleSecondPassword(e.target.value)}
        />
        <div className="password_toggle_icon" onClick={toggleShowPasswordRepeat}>
          {showPasswordRepeat ? <RiEyeCloseFill /> : <RiEyeFill />}
        </div>
      </div>
    </div>
        <ErrorMessage errorMessage={secondPasswordErrorMessage}/>
      </div>
      <div className="input_checkbox_wrap">
        <div className="input_checkbox_wrap-item">
          <input className="checkbox_input" 
          id="remember_me" 
          type="checkbox" 
          checked={userAgreement}
          onChange={() => setUserAgreement((state) => !state)}
          />
          <label htmlFor="remember_me" className={userAgreement ? '' : 'danger'}>Confirm user agreement</label>
        </div>
        <div className="input_checkbox_wrap-item">
          <input className="checkbox_input" 
          id="remember_me" 
          type="checkbox" />
          <label htmlFor="remember_me">Send me newsletter</label>
        </div>
      </div>

      <div className="button_singup">
        {" "}
        <button onClick={handleRegistration}>Sign up</button>
      </div>
    </div>
  );
};

export default SingUp;
