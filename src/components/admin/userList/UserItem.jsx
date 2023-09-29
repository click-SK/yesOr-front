import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../http/baseUrl";
import UserModal from "./UserModal";
import axios from "axios";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { BsInfoCircleFill, BsArrowBarDown } from "react-icons/bs";
import ModalProjectConfirm from "../ModalProjectConfirm";
import UserHistoryDonat from './UserHistoryDonat.jsx'
import UserDocument from "./UserDocument";
import UserInfoItem from "./UserInfoItem";
import ChatWrap from "../../chat/ChatWrap";

const UserItem = ({ item, setReloadUserData}) => {
  const [isOpenDocuments, setIsOpenDocuments] = useState(false)
  const [isOpenInfoUser, setIsOpenInfoUser] = useState(false)
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalUnConfirm, setIsOpenModalUnConfirm] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false)
  const [animation, setAnimation] = useState(false);


  const handleBlockedUser = () => {
    try {
      axios
        .patch(`${BASE_URL}/update-user-activated`, {
          id: item?._id,
          isActivated: !item?.isActivated,
        })
        .then(() => {
            setReloadUserData((state) => !state);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const handleVerifiedUser = () => {
    try {
      axios
        .patch(`${BASE_URL}/update-user-verified`, {
          id: item._id,
          isVerified: !item.isVerified,
        })
        .then(() => {
            setReloadUserData((state) => !state);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrOpenChat = () => {

    setAnimation(state => !state)
    axios.post(`${BASE_URL}/create-messanger`, {
        userId: item._id
    })
}



useEffect(() => {
  if(animation){
    setIsOpenChat(true);
  } else {
    const timeoutId = setTimeout(() => {
      setIsOpenChat(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }
}, [animation]);





  return (
    <div
      className={`project_item admin_project_item ${
        isOpenInfoUser ? "open_info_user" : ""
      }`}
      key={item._id}
    >
      <div className={`user_wrap_item `}>
        <div 
        onClick={() => setIsOpenInfoUser(!isOpenInfoUser)}
        className="user_information_wrap">
        <img src={`${BASE_URL}${item?.userImage}`} alt="" />
        <p>
          {item?.firstName + " " + item?.lastName}
          <BsArrowBarDown
            className="info_user_icon"
          />
        </p>
        </div>
        <div className="admin_project_item_svg">
          <img
            src="./mainPage/icons/ph_chat-centered-dots-light.svg"
            alt=""
            onClick={() => handleCreateOrOpenChat()}
          />
          <div>
            {!item?.isVerified ? (
              <img
                onClick={() => setIsOpenModalConfirm(!isOpenModalConfirm)}
                src="./mainPage/icons/ph_info-light.svg"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsOpenModalUnConfirm(!isOpenModalUnConfirm)}
                src="./mainPage/icons/delete.svg"
                alt=""
              />
            )}
          </div>
          <div className="block_user_btn" onClick={handleBlockedUser}>
            {item?.isActivated ? (
              <img src="./mainPage/icons/block.svg" alt="" />
            ) : (
              <AiOutlineLock />
            )}
          </div>
          <img
            className="history_icon"
            src="./mainPage/icons/solar_history-outline.svg"
            alt=""
            onClick={() => setIsOpenHistory(!isOpenHistory)}
          />
          <HiOutlineDocumentSearch
            onClick={() => setIsOpenDocuments(!isOpenDocuments)}
          />
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
        {isOpenHistory && (
          <UserHistoryDonat
            setIsOpen={setIsOpenHistory}
            isUser={true}
            user={item}
          />
        )}
        {isOpenDocuments && (
          <UserModal
            isOpen={isOpenDocuments}
            setIsOpen={setIsOpenDocuments}
            documents={item?.userDocuments.length != 0 && item?.userDocuments}
            name={item?.firstName}
          />
        )}
      </div>
      <UserInfoItem
        setIsOpen={setIsOpenInfoUser}
        isOpenInfoUser={isOpenInfoUser}
        item={item}
      />
      {isOpenChat && 
        <ChatWrap
          setIsOpen={setIsOpenChat}
          isOpen={isOpenChat}
          user={item}
          isUser={false}
          isAdmin={true}
          animation={animation}
          setAnimation={setAnimation}
        />
      }
    </div>
  );
};

export default UserItem;
