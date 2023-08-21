import React from "react";
import "../../../styles/modalWindow.scss";

const UserHistoryDonat = ({ setIsOpen, isUser, user, project }) => {
    console.log('project',project);
  return (
    <div className="modal_wrap">
      <div className="item_body pad">
        <h2>History</h2>
        {isUser ? (
          <div className="content_modal">
            <div className="title_wrap">
              <p>Project name</p>
              <p>Donation amount</p>
              <p>Coment</p>
            </div>
            {user?.donatesProjects.map((item) => (
              <div key={item._id} className="info_wrap">
                <p>{item?.project?.name}</p>
                <p>{item?.sum}$</p>
                <p>{item?.comment ? item?.comment : "-----"}</p>
                <p>{item?.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="content_modal">
            <div className="title_wrap">
              <p>User name</p>
              <p>Donation amount</p>
            </div>
            {project?.donatsHistory.map((item) => (
              <div key={item._id} className="info_wrap">
                <p>{item?.user}</p>
                <p>{item?.sum}</p>
                <p>{item?.date}</p>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setIsOpen((state) => !state)}>Close</button>
      </div>
    </div>
  );
};

export default UserHistoryDonat;
