import React, {useState} from 'react';
import Pagination from '../Pagination';
const ProjectComments = ({commentsArr}) => {
  const [paginationArray, setPaginationArray] = useState([]);
    return (
        <div className="coments_wrap">
          {paginationArray.map((item, idx) => (
            <div key={idx} className="coment_item">
              <img className="coment_img" src={item?.img} alt="" />
              <p className="coment_name">{item?.name}</p>
              <p className="coment_coment">{item?.coment}</p>
              <p className="coment_date">{item?.date}</p>
            </div>
          ))}
            <Pagination dataArray={commentsArr} setFilterArray={setPaginationArray}/>
        </div>
    );
};

export default ProjectComments;