import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterByDate = ({ allProjects, setAllProjects }) => {
    const [isOpen, setIsOpen] = useState(false);

  const sortArr = [
    { id: 1, name: 'Name (A to Z)' },
    { id: 2, name: 'Name (Z to A)' },
    { id: 3, name: 'Date (Newest First)' },
    { id: 4, name: 'Date (Oldest First)' },
    { id: 5, name: 'Budget (Low to High)' },
    { id: 6, name: 'Budget (High to Low)' }
  ];

  const handleSort = (sortId) => {
    setIsOpen(false);

    let sortedProjects;

    switch (sortId) {
      case 1:
        sortedProjects = [...allProjects].sort((a, b) => a.projects.name.localeCompare(b.projects.name));
        break;
      case 2:
        sortedProjects = [...allProjects].sort((a, b) => b.projects.name.localeCompare(a.projects.name));
        break;
      case 3:
        sortedProjects = [...allProjects].sort((a, b) => new Date(b.projects.period.startDate) - new Date(a.projects.period.startDate));
        break;
      case 4:
        sortedProjects = [...allProjects].sort((a, b) => new Date(a.projects.period.startDate) - new Date(b.projects.period.startDate));
        break;
      case 5:
        sortedProjects = [...allProjects].sort((a, b) => a.projects.target - b.projects.target);
        break;
      case 6:
        sortedProjects = [...allProjects].sort((a, b) => b.projects.target - a.projects.target);
        break;
      default:
        break;
    }

    setAllProjects(sortedProjects);
  };

  return (
    <div className={`filter_by_name-wrap ${isOpen ? 'open_list-wrap' : ''}`}>
      <div onClick={() => setIsOpen(!isOpen)} className='value_sort'>
        <p>Sort By <IoIosArrowDown /> </p>
      </div>
      <div className={`sort_var_item ${isOpen ? 'sort_var_item_open' : ''}`}>
        {sortArr.map((item, idx) => (
          <p key={idx} onClick={() => handleSort(item.id)}>
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FilterByDate;
