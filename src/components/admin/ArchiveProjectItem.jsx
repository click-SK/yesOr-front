import React, {useState} from 'react';
import UserHistoryDonat from "./userList/UserHistoryDonat";
import ModalProjectConfirm from "./ModalProjectConfirm";
import { Link } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { TiDocumentDelete } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import ChatWrap from '../chat/ChatWrap';
const ArchiveProjectItem = ({
    item,
}) => {

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
    
        const truncatedText = text.substr(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    
        return truncatedText.substr(0, lastSpaceIndex) + "...";
      };

    return (
        <div key={item._id} className="project_item admin_project_item">
          <Link
            to={`/project/${item.projects._id}`}
          >
            <p>{item?.projects?.name}</p>
            <p>{item?.projects?.category}</p>
            <p>{truncateText(item?.projects?.description, 50)}</p>
            <p>{item?.projects?.target}</p>
          </Link>
          <div className="admin_project_item_svg">
          </div>
          {/* <ModalProjectConfirm
            title={"Confirm Verification?"}
            isOpenModal={isOpenModalConfirm}
            setIsOpen={setIsOpenModalConfirm}
            handleChangeFunc={handleChangeFunc}
            item={item}
          />
          <ModalProjectConfirm
            title={"Are you sure you want to delete the request?"}
            isOpenModal={isOpenModalUnConfirm}
            setIsOpen={setIsOpenModalUnConfirm}
            handleChangeFunc={handleChangeFunc}
            item={item}
          /> */}
          {/* {isOpenHistory && (
            <UserHistoryDonat
              setIsOpen={setIsOpenHistory}
              isUser={false}
              project={item?.projects}
            />
          )} */}
        {/* {isOpenChat &&
      <ChatWrap
        setIsOpen = {setIsOpenChat}
        isOpen = {isOpenChat}
        user={item?.projects?.user}
        isUser={false}
        isAdmin={true}
        />
      } */}
        </div>
    );
};

export default ArchiveProjectItem;