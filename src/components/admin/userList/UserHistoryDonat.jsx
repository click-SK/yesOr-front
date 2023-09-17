import React, {useState} from "react";
import "../../../styles/modalWindow.scss";
import Pagination from "../../Pagination";
const UserHistoryDonat = ({ setIsOpen, isUser, user, project }) => {
  const [paginationArray, setPaginationArray] = useState([]);

  return (
    <div className="modal_wrap">
      <div className="item_body pad modal_wraper_donat modal">
        <h2 style={{marginTop:'300px'}}>History</h2>
        {isUser ? (
          <div className="content_modal">
            <div className="title_wrap">
              <p>Project name</p>
              <p>Donation amount</p>
              <p>Coment</p>
              <p>Date</p>
            </div>
            {paginationArray.length != 0 && paginationArray.map((item) => (
              <div key={item._id} className="info_wrap">
                <p>{item?.project?.name}</p>
                <p>{item?.sum}$</p>
                <p>{item?.comment ? item?.comment : "-----"}</p>
                <p>{item?.date}</p>
              </div>
            ))}
            <Pagination dataArray={user?.donatesProjects} setFilterArray={setPaginationArray}/>
          </div>
        ) : (
          <div className="content_modal">
            <div className="title_wrap">
              <p>User name</p>
              <p>Donation amount</p>
            </div>
            {paginationArray.length != 0 && paginationArray.map((item) => (
              <div key={item._id} className="info_wrap">
                <p>{item?.user}</p>
                <p>{item?.sum}</p>
                <p>{item?.date}</p>
              </div>
            ))}
            <Pagination dataArray={project?.donatsHistory} setFilterArray={setPaginationArray}/>
          </div>
        )}
        <button onClick={() => setIsOpen((state) => !state)}>Close</button>
      </div>
    </div>
  );
};

export default UserHistoryDonat;
