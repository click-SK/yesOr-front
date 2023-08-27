import React, { useState } from "react";
import { BASE_URL } from "../../../http/baseUrl";
import UserModal from "./UserModal";
import axios from "axios";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { BsInfoCircleFill } from "react-icons/bs";
import ModalProjectConfirm from "../ModalProjectConfirm";
import UserHistoryDonat from './UserHistoryDonat.jsx'
import UserDocument from "./UserDocument";
import UserInfoItem from "./UserInfoItem";
import ChatWrap from "../../chat/ChatWrap";

const UserItem = ({ item, setReloadUserData, setIsOpenChat }) => {
  const [isOpenDocuments, setIsOpenDocuments] = useState(false)
  const [isOpenInfoUser, setIsOpenInfoUser] = useState(false)
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalUnConfirm, setIsOpenModalUnConfirm] = useState(false);

  const handleBlockedUser = () => {
    try {
      axios
        .patch(`${BASE_URL}/update-user-activated`, {
          id: item?._id,
          isActivated: !item?.isActivated,
        })
        .then(() => {
          setTimeout(() => {
            setReloadUserData((state) => !state);
          }, 500);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log('user list item',item);
  const handleVerifiedUser = () => {
    console.log("work");
    try {
      axios
        .patch(`${BASE_URL}/update-user-verified`, {
          id: item._id,
          isVerified: !item.isVerified,
        })
        .then(() => {
          setTimeout(() => {
            setReloadUserData((state) => !state);
          }, 500);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('InfoUser', item);

  return (
    <div className={`project_item admin_project_item ${isOpenInfoUser ? 'open_info_user' : ''}`} key={item._id}>
      <div className={`user_wrap_item `}>
      <img src={`${BASE_URL}${item?.userImage}`} alt="" />
      <p>{item?.firstName + " " + item?.lastName }
       <BsInfoCircleFill
       onClick={()=>setIsOpenInfoUser(!isOpenInfoUser)}
       className="info_user_icon"
       /></p>
      <div className="admin_project_item_svg">
        <img src="./icons/ph_chat-centered-dots-light.svg" alt=""  onClick ={() => setIsOpenChat(state => !state)}/>
        <div>
          {!item?.isVerified ? (
            <img
              onClick={() => setIsOpenModalConfirm(!isOpenModalConfirm)}
              src="./icons/ph_info-light.svg"
              alt=""
            />
          ) : (
            <img
              onClick={() => setIsOpenModalUnConfirm(!isOpenModalUnConfirm)}
              src="./icons/delete.svg"
              alt=""
            />
          )}
        </div>
        <div className="block_user_btn" onClick={handleBlockedUser}>
          {item?.isActivated ? (
            <img src="./icons/block.svg" alt="" />
          ) : (
            <AiOutlineLock />
          )}
        </div>
        <img
          className="history_icon"
          src="./icons/solar_history-outline.svg"
          alt=""
          onClick={() => setIsOpenHistory(!isOpenHistory)}
        />
        <HiOutlineDocumentSearch onClick={() => setIsOpenDocuments(!isOpenDocuments)}/>
      </div>


      <ModalProjectConfirm
        title={"Confirm Verification?"}
        isOpenModal={isOpenModalConfirm}
        setIsOpen={setIsOpenModalConfirm}
        handleChangeFunc={handleVerifiedUser}
      />
      <ModalProjectConfirm
        title={"Are you sure you want to delete the request??"}
        isOpenModal={isOpenModalUnConfirm}
        setIsOpen={setIsOpenModalUnConfirm}
        handleChangeFunc={handleVerifiedUser}
      />
      {isOpenHistory && 
      <UserHistoryDonat
      setIsOpen = {setIsOpenHistory}
      isUser = {true}
      user={item}
      />
      }
      {isOpenDocuments &&
      <UserModal
      isOpen={isOpenDocuments}
      setIsOpen={setIsOpenDocuments}
      documents={item?.userDocuments.length != 0 && item?.userDocuments}
      name={item?.firstName}
    />
      }
      

    </div>
    <UserInfoItem
      setIsOpen = {setIsOpenInfoUser}
      isOpenInfoUser = {isOpenInfoUser}
      item = {item}
      />
    </div>
  );
};

export default UserItem;
