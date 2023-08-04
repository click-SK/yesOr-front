import React, { useState } from "react";
import { BASE_URL } from "../../../http/baseUrl";
import UserModal from "./UserModal";
import axios from "axios";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import ModalProjectConfirm from "../ModalProjectConfirm";
const UserItem = ({ item, setReloadUserData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalUnConfirm, setIsOpenModalUnConfirm] = useState(false);

  const handleBlockedUser = () => {
    try {
      axios.patch(`${BASE_URL}/update-user-activated`, {
        id: item._id,
        isActivated: !item.isActivated,
      }).then(() => {
        setTimeout(() => {
          setReloadUserData((state) => !state)
        },500)
      })
    } catch(error) {
      console.log(error);
    }
  };
  const handleVerifiedUser = () => {
    try {
      axios.patch(`${BASE_URL}/update-user-verified`, {
        id: item._id,
        isVerified: !item.isVerified,
      }).then(() => {
        setTimeout(() => {
          setReloadUserData((state) => !state)
        },500)
      })
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="project_item admin_project_item" key={item._id}>
      <img src={`${BASE_URL}${item.userImage}`} alt="" />
      <p>{item.firstName + " " + item.lastName}</p>

      <button onClick={() => setIsOpenModal(!isOpenModal)}> Open modal</button>

      <div className="admin_project_item_svg">
        <img src="./icons/ph_chat-centered-dots-light.svg" alt="" />
        <div>
          {item.isVerified ? (
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
      </div>
      <div onClick={handleBlockedUser}>
        {item.isActivated ? (
          <AiOutlineUnlock style={{ width: "30px", height: "30px" }} />
        ) : (
          <AiOutlineLock style={{ width: "30px", height: "30px" }} />
        )}
      </div>
      <UserModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        documents={item.userDocuments.length != 0 && item.userDocuments}
        name={item.firstName}
      />
      <ModalProjectConfirm
        title={"Confirm Verification?"}
        isOpenModal={isOpenModalConfirm}
        setIsOpen={setIsOpenModalConfirm}
        handleVerifiedUser={handleVerifiedUser}
      />
      <ModalProjectConfirm
        title={"Are you sure you want to delete the request??"}
        isOpenModal={isOpenModalUnConfirm}
        setIsOpen={setIsOpenModalUnConfirm}
        handleVerifiedUser={handleVerifiedUser}
      />
    </div>
  );
};

export default UserItem;
