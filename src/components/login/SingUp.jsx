import React, {useState} from "react";
import FormTitle from "./FormTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registration } from "../../store/authUser";
import { useDispatch } from "react-redux";
import * as validator from "../../validation/validator.js";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegistration = async () => {
    try {
      console.log('wrok');
      const resoult = validator.validationRegistration({ email, password, phone, firstName, lastName, socialNetwork, secondPassword});
      handleValidateEmail(email);
      console.log('resoult',resoult);

      if(resoult.isValid && userAgreement) {
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
      } else {
        resoult?.reason == 'email' ? setEmailErrorMessage(resoult?.error) : setEmailErrorMessage('');
        resoult.reason == 'password' ? setPasswordErrorMessage(resoult.error) : setPasswordErrorMessage('');
        resoult.reason == 'secondPassword' ? setSecondPasswordErrorMessage(resoult.error) : setSecondPasswordErrorMessage('');
        resoult.reason == 'phone' ? setPhoneErrorMessage(resoult.error) : setPhoneErrorMessage('');
        resoult.reason == 'firstName' ? setFirstNameErrorMessage(resoult.error) : setFirstNameErrorMessage('');
        resoult.reason == 'lastName' ? setLastNameErrorMessage(resoult.error) : setLastNameErrorMessage('');
      }
    } catch(error) {
      console.log(error);
    }
  }

  console.log('userAgreement',userAgreement);

  //--Valodation functions

  const handleEmail = (e) => {
    setEmail(e);
    handleValidateEmail(e);
  }

  const handleValidateEmail = (e) => {
    const resoult = validator.validationRegistration({email: e});
    console.log('resoult email',resoult);

    if(resoult?.isValid) {
      setEmailErrorMessage('');
    } else {
      resoult?.reason == 'email' ? setEmailErrorMessage(resoult?.error) : setEmailErrorMessage('');
    }
  }
  const handleFirstName = (e) => {
    setFirstName(e);
    handleValidateFirstName(e);
  }

  const handleValidateFirstName = (e) => {
    const resoult = validator.validationRegistration({firstName: e});

    if(resoult?.isValid) {
      setFirstNameErrorMessage('');
    } else {
      resoult?.reason == 'firstName' ? setFirstNameErrorMessage(resoult?.error) : setFirstNameErrorMessage('');
    }
  }
  const handleLastName = (e) => {
    setLastName(e);
    handleValidateLastName(e);
  }

  const handleValidateLastName = (e) => {
    const resoult = validator.validationRegistration({lastName: e});

    if(resoult?.isValid) {
      setLastNameErrorMessage('');
    } else {
      resoult?.reason == 'lastName' ? setLastNameErrorMessage(resoult?.error) : setLastNameErrorMessage('');
    }
  }

  const handlePhone = (e) => {
    setPhone(e);
    handleValidatePhone(e);
  }

  const handleValidatePhone = (e) => {
    const resoult = validator.validationRegistration({phone: e});

    if(resoult?.isValid) {
      setPhoneErrorMessage('');
    } else {
      resoult?.reason == 'phone' ? setPhoneErrorMessage(resoult?.error) : setPhoneErrorMessage('');
    }
  }
  const handlePassword = (e) => {
    setPassword(e);
    handleValidatePassword(e);
  }

  const handleValidatePassword = (e) => {
    const resoult = validator.validationRegistration({password: e});
    console.log('password resoult',resoult);
    if(resoult?.isValid) {
      setPasswordErrorMessage('');
      console.log('password resoult yes');
    } else {
      resoult?.reason == 'password' ? setPasswordErrorMessage(resoult?.error) : setPasswordErrorMessage('');
      console.log('password resoult no');
    }
  }
  const handleSecondPassword = (e) => {
    setSecondPassword(e);
    handleValidateSecondPassword(e);
  }

  const handleValidateSecondPassword = (e) => {
    const resoult = validator.validationRegistration({secondPassword: e, password});
    console.log('second password resoult',resoult);
    if(resoult?.isValid) {
      setSecondPasswordErrorMessage('');
    } else {
      resoult?.reason == 'secondPassword' ? setSecondPasswordErrorMessage(resoult?.error) : setSecondPasswordErrorMessage('');
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
            </div>
            {emailErrorMessage && <p className="danger">{emailErrorMessage}</p>}
        <div className="input_item">
          <label htmlFor="first_name">First name*</label>
          <input id="first_name" 
          type="text" 
          value={firstName}
          onChange={(e) => handleFirstName(e.target.value)}/>
        </div>
        {firstNameErrorMessage && <p className="danger">{firstNameErrorMessage}</p>}
        <div className="input_item">
          <label htmlFor="lust_name">Last name*</label>
          <input id="lust_name" 
          type="text" 
          value={lastName}
          onChange={(e) => handleLastName(e.target.value)}/>
        </div>
        {lastNameErrorMessage && <p className="danger">{lastNameErrorMessage}</p>}
        <div className="input_item">
          <label htmlFor="phone">Number phone*</label>
          <input id="phone" 
          type="phone" 
          value={phone}
          onChange={(e) => handlePhone(e.target.value)}/>
        </div>
        {phoneErrorMessage && <p className="danger">{phoneErrorMessage}</p>}
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
          <input id="password1" 
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}/>
        </div>
        {passwordErrorMessage && <p className="danger">{passwordErrorMessage}</p>}
        <div className="input_item">
          <label htmlFor="password2">Second Password *</label>
          <input id="password2" 
          type="password"
          value={secondPassword}
          onChange={(e) => handleSecondPassword(e.target.value)}/>
        </div>
        {secondPasswordErrorMessage && <p className="danger">{secondPasswordErrorMessage}</p>}
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
