import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
const ProjectComments = ({commentsArr, projectId, setReload}) => {
  const [paginationArray, setPaginationArray] = useState([]);
  const isAdmin = useSelector((state) => state.authAdmin.isAdmin);

  const handleDeleteComment = (commentId) => {
    try{
      axios.delete(`${BASE_URL}/delete-one-comment`,{
        data: {
          projectId,
          commentId
        }
      }) .then(() => {
        setTimeout(() => {
          setReload((state) => !state)
        },500)
      })
    } catch(error) {
      console.log(error);
    }
  }
  console.log('commentsArr',commentsArr);
    return (
        <div className="coments_wrap">
          {paginationArray.map((item, idx) => (
            <div key={idx} className="coment_item">
              <img className="coment_img" src={item?.user ? (item?.user?.userImage ? item?.user?.userImage : '/icons/no-avatar.webp') : '/icons/no-avatar.webp'} alt="" />
              <p className="coment_name">{item?.name ? item?.name : item.user.firstName + ' ' + item.user.lastName}</p>
              <p className="coment_coment">{item?.text}</p>
              <p className="coment_date">{item?.date}</p>
              {isAdmin && <p style={{color: 'red', cursor:'pointer'}} onClick={() => handleDeleteComment(item?._id)}>X</p>}
            </div>
          ))}
            <Pagination dataArray={commentsArr} setFilterArray={setPaginationArray}/>
        </div>
    );
};

export default ProjectComments;