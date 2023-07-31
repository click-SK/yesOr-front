import React, {useState} from "react";
import FormTitle from "./FormTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registration } from "../../store/authUser";
import { useDispatch } from "react-redux";
const SingUp = ({ hendlerChangeblock, isSingIn, mobile}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [socialNetwork, setSocialNetwork] = useState('');
  const [passport, setPassport] = useState('');
  const [requisites, setRequisites] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegistration = async () => {
    try {
      const data = await dispatch(registration({email, password, firstName, lastName, phone, socialNetwork, passport, requisites}));
      if('user' in data.payload) {
        window.localStorage.setItem('Y-R-U-T', data.payload.accessToken);
        navigate('/profile');
        window.location.reload();
      }
    } catch(error) {
      console.log(error);
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
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
        <div className="input_item">
          <label htmlFor="first_name">First name*</label>
          <input id="first_name" 
          type="text" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="input_item">
          <label htmlFor="lust_name">Last name*</label>
          <input id="lust_name" 
          type="text" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="input_item">
          <label htmlFor="phone">phone phone*</label>
          <input id="phone" 
          type="phone" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className="input_item">
          <label htmlFor="socia">
            Specify a social network to contact you *
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
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="input_item">
          <label htmlFor="passport">Passport *</label>
          <input id="passport" 
          type="passport" 
          value={passport}
          onChange={(e) => setPassport(e.target.value)}/>
        </div>
        <div className="input_item">
          <label htmlFor="requi">Requisites *</label>
          <input id="requi" 
          type="text" 
          value={requisites}
          onChange={(e) => setRequisites(e.target.value)}/>
        </div>
      </div>
      <div className="input_checkbox_wrap">
        <div className="input_checkbox_wrap-item">
          <input className="checkbox_input" id="remember_me" type="checkbox" />
          <label htmlFor="remember_me">Confirm user agreement</label>
        </div>
        <div className="input_checkbox_wrap-item">
          <input className="checkbox_input" id="remember_me" type="checkbox" />
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
