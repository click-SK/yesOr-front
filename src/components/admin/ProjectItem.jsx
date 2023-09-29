import React, { useState, useEffect } from "react";
import UserHistoryDonat from "./userList/UserHistoryDonat";
import ModalProjectConfirm from "./ModalProjectConfirm";
import { Link } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { TiDocumentDelete } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import ChatWrap from '../chat/ChatWrap';
const ProjectItem = ({item, handleChangeFunc, verified, onlyId, projectMainPage, setReload, isOpenChat, setIsOpenChat}) => {
    const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
    const [isOpenModalUnConfirm, setIsOpenModalUnConfirm] = useState(false);
    const [isOpenHistory, setIsOpenHistory] = useState(false);
    const [animation, setAnimation] = useState(false);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
    
        const truncatedText = text.substr(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    
        return truncatedText.substr(0, lastSpaceIndex) + "...";
      };

    const handleSendProjectOnMainPage = (item) => {
      try {
            axios
              .post(`${BASE_URL}/add-project-main-page`, {
                projectId: item?.projects?._id,
              })
              .then((res) => {
                  alert("Project added to main page");
                  setReload((state) => !state);
              });
          } catch(error) {
              console.log(error);
          }
      };

      const handleRemoveProjectFromMainPage = (item) => {
        const currentProject = projectMainPage.filter(
          (proj) => proj.project._id == item.projects._id
        );
        if (currentProject) {
          axios
            .delete(`${BASE_URL}/remove-project-main-page`, {
              data: {
                projectId: item.projects._id,
                currentId: currentProject[0]?._id,
              },
            })
            .then(() => {
                alert("Project remove from main page");
                setReload((state) => !state);
            })
            .catch((error) => {
              console.log("Request error", error);
            });
        }
      };

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
            <img src="./mainPage/icons/ph_chat-centered-dots-light.svg" alt="" onClick={() => setAnimation(state => !state)}/>
            {!verified ? (
              <img
                onClick={() => setIsOpenModalConfirm(!isOpenModalConfirm)}
                src="./icons/ph_info-light.svg"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsOpenModalUnConfirm(!isOpenModalUnConfirm)}
                src="./mainPage/icons/delete.svg"
                alt=""
              />
            )}
            <img
              className="history_icon"
              src="./mainPage/icons/solar_history-outline.svg"
              alt=""
              onClick={() => setIsOpenHistory(!isOpenHistory)}
            />
            <div>
              {onlyId.includes(item?.projects?._id) ? (
                <TiDocumentDelete
                  title="Remove from main"
                  onClick={() => handleRemoveProjectFromMainPage(item)}
                />
              ) : (
                <BiAddToQueue
                  title="Add to the main page"
                  onClick={() => handleSendProjectOnMainPage(item)}
                />
              )}
            </div>
          </div>
          <ModalProjectConfirm
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
          />
          {isOpenHistory && (
            <UserHistoryDonat
              setIsOpen={setIsOpenHistory}
              isUser={false}
              project={item?.projects}
            />
          )}
        {isOpenChat &&
      <ChatWrap
        setIsOpen = {setIsOpenChat}
        isOpen = {isOpenChat}
        user={item?.projects?.user}
        isUser={false}
        isAdmin={true}
        animation={animation}
        setAnimation={setAnimation}
        />
      }
        </div>
    );
};

export default ProjectItem;