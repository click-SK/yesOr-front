import React from 'react';
import { BASE_URL } from '../../http/baseUrl';
import { Link } from 'react-router-dom';
const ProjectListTemplate = ({item}) => {
    return (
      <div className="project_item">
        {item?.projectMedia.length != 0 ? (
          <img src={`${BASE_URL}${item.projectMedia[0]}`} alt="itemimg" />
        )
        :
        <img src={`./file/Rectangle 53.png`} alt="itemimg" />}
        <div className='project_item-column'>
          <h4>Info</h4>
          <p>{item?.name}</p>
        </div>
        <div className='project_item-column'>
          <h4>Budget</h4>
          <p>{item?.target}</p>
        </div>
        <div className='project_item-column'>
          <h4>Main info</h4>
          <p>{item?.description}</p>
        </div>
      </div>
    );
};

export default ProjectListTemplate;