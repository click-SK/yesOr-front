import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {BASE_URL} from '../../http/baseUrl';
import SelectedDocuments from './SelectedDocuments';
const SettingPrifile = ({ isOpenSetting, setIsOpenSetting, currentUser, setReloadUser }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [socialNetwork, setSocialNetwork] = useState("");
  const [passport, setPassport] = useState("");
  const [requisites, setRequisites] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const inputFileRef = useRef(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);
  console.log('image',image);

  useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setPhone(currentUser.phone);
    setSocialNetwork(currentUser.socialNetwork);
    setPassport(currentUser.passport);
    setRequisites(currentUser.requisites);
    setEmail(currentUser.email);
  },[currentUser])

  const handleUpdateUserData = () => {
    const formData = new FormData();
    formData.append("userImage", image);
    formData.append("email", email);
    formData.append("requisites", requisites);
    formData.append("passport", passport);
    formData.append("socialNetwork", socialNetwork);
    formData.append("phone", phone);
    formData.append("lastName", lastName);
    formData.append("firstName", firstName);
    formData.append("id", currentUser._id);
    console.log('formData',formData);
    axios.patch(`${BASE_URL}/update-user-data`, formData).then(() =>
    setTimeout(() => {
      setReloadUser((state) => !state)
    },500))
  }

  const handleUpdateUserPassword = () => {
    try {
      axios.patch(`${BASE_URL}/update-user-password`, {
        id: currentUser._id,
        currentPassword,
        newPassword
      })
    } catch(error) {
       console.log(error); 
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="profile_user_wrap">
      <div className="photo_profile">
        <img
          className="photo_profile_hero"
          src={imageSrc || `${BASE_URL}${currentUser.userImage}`}
          alt=""
        />
        {/* <img
          className="photo_profile_hero"
          src={`${BASE_URL}/${currentUser.userImage}`}
          alt=""
        /> */}
                    <input
              type="file"
              name="img"
              onChange={handleImageChange}
              ref={inputFileRef}
              hidden
            />
        <img className="edit_photo_profile" onClick={() => inputFileRef.current.click()} src="./file/edit.svg" alt="" />
      </div>
      <div className="content">
        <div>
          <div className="input_wrap">
            <div className="input_item">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="first_name">First name*</label>
              <input
                id="first_name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="lust_name">Last name*</label>
              <input
                id="lust_name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="phone">Number phone*</label>
              <input
                id="phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="socia">
                Specify a social network to contact you *
              </label>
              <input
                id="socia"
                type="text"
                value={socialNetwork}
                onChange={(e) => setSocialNetwork(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="password2">Passport *</label>
              <input
                id="passport"
                type="passport"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="requi">Requisites *</label>
              <input
                id="requi"
                type="text"
                value={requisites}
                onChange={(e) => setRequisites(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleUpdateUserData}>Save</button>
        </div>
        <div className="content">
        <div>
          <div className="input_wrap">
          <div className="input_item">
              <label htmlFor="current-password">Curren password *</label>
              <input
                id="current-password"
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          <div className="input_item">
              <label htmlFor="new-password">New password *</label>
              <input
                id="new-password"
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleUpdateUserPassword}>Change password</button>
        </div>
      </div>
      <SelectedDocuments/>
      </div>
    </div>
  );
};

export default SettingPrifile;
