import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {BASE_URL} from '../../http/baseUrl';
import SelectedDocuments from './SelectedDocuments';
import ModalProjectConfirm from "../admin/ModalProjectConfirm";
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
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

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

  useEffect(() => {
    setFirstName(currentUser?.firstName);
    setLastName(currentUser?.lastName);
    setPhone(currentUser?.phone);
    setSocialNetwork(currentUser?.socialNetwork);
    setPassport(currentUser?.passport);
    setRequisites(currentUser?.requisites);
    setEmail(currentUser?.email);
  },[currentUser])

  const handleUpdateUserData = () => {
    try {
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
      axios.patch(`${BASE_URL}/update-user-data`, formData).then(() =>
      setTimeout(() => {
        setReloadUser((state) => !state)
      },500))
    } catch(error) {
        console.log(error);
    }
  }

  const handleUpdateUserPassword = () => {
    try {
      axios.patch(`${BASE_URL}/update-user-password`, {
        id: currentUser?._id,
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


  const documentOptions = ["Passport", "Driver's License"];
  const passportTypeOptions = ["New", "Old"];


  return (
    <div className="profile_user_wrap">
      <div className="photo_profile">
        {currentUser.userImage 
        ?
        <img
        className="photo_profile_hero"
        src={imageSrc || `${BASE_URL}${currentUser.userImage}`}
        alt=""
      />
        :
        <img
        className="photo_profile_hero"
        src='/icons/no-avatar.webp'
        alt=""
      />
        }
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
        <div className="wrap_block">
          <div className="input_wrap-profile">
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
          <button className="btn_profile-edit" onClick={() => setIsOpenModalConfirm(!isOpenModalConfirm)}>Save</button>
        </div>
        <div>
        <div className="wrap_block">
          <div className="input_wrap-profile">
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
          <button className="btn_profile-logout" onClick={handleUpdateUserPassword}>Change password</button>
          </div>
      </div>
      <SelectedDocuments/>
      </div>
      <ModalProjectConfirm
            title={"If you change your information, you will need to verify again"}
            isOpenModal={isOpenModalConfirm}
            setIsOpen={setIsOpenModalConfirm}
            handleChangeFunc={handleUpdateUserData}
            // item={item}
          />
    </div>
  );
};

export default SettingPrifile;
