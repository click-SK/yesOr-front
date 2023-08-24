import React, {useState} from 'react';
import Pagination from '../Pagination';
const ProjectdonatsHistory = ({donatsHistory}) => {
    const [paginationArray, setPaginationArray] = useState([]);
    return (
        <div className="donat_block">
        <h4>DONAT HISTORY</h4>
          {donatsHistory.map((item) => (
            <div className="donat_history_wrap" key={item._id}>
              <p className="donat_history-item">{item.date}</p>
              <p className="donat_history-item">{item.user}</p>
              <p className="donat_history-item">{item.sum} $</p>
              <p className="donat_history-item">{item.text ? item.text : '----'}</p>
            </div>
          ))}
            {/* <Pagination dataArray={donatsHistory} setFilterArray={setPaginationArray}/> */}
      </div>
    );
};

export default ProjectdonatsHistory;