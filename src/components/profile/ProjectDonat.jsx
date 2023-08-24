import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';

const ProjectDonat = ({savedProjects, setIsOpen, user}) => {
    const [paginationArray, setPaginationArray] = useState([]);
    const [reversedProjectArr, setReversedProjectArr] = useState([]);

    useEffect(() => {
        const reverse = [...user.donatesProjects].reverse();
        setReversedProjectArr(reverse)
      },[user])

    return (
        <div className='project_wrap new_modal_project donat_wrap_page'>
            <div className="profile_title favorit_title">
                <button onClick={() => setIsOpen(state => !state )}>Close</button>
                <h2>Favorite</h2>
            </div>
            {paginationArray.map((item,idx)=>(
                    <Link to={`/project/${item.project?._id}`}>
                <div className='project_item'>
                        <div className='project_item-column'>
                        <h4>Name</h4>
                        <p>{item?.project?.name}</p>
                        </div>
                        <div className='project_item-column'>
                        <h4>Comment</h4>
                        <p>{item?.comment}</p>
                        </div>
                        <div className='project_item-column'>
                        <h4>Amount donate</h4>
                        <p>{item?.sum} $</p>
                        </div>
                    
                    
                </div>
                    </Link>
            ))}
            <Pagination dataArray={reversedProjectArr} setFilterArray={setPaginationArray}/>
        </div>
    );
};

export default ProjectDonat;