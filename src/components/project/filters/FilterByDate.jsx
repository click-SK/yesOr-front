import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterByDate = ({ allProjects, setAllProjects }) => {
    const [sortVar, setSortVar] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const sortDateArr = [
        {
            id: 1,
            name: 'Newest First'
        },
        {
            id: 2,
            name: 'Oldest First'
        },
    ];

    const handleSort = (sortId) => {
        setSortVar(sortId);
        setIsOpen(false);

        if (sortId === 1) {
            const sortedProjects = allProjects.slice().sort((a, b) =>
                new Date(b.projects.period.startDate) - new Date(a.projects.period.startDate)
            );
            setAllProjects(sortedProjects);
        } else if (sortId === 2) {
            const sortedProjects = allProjects.slice().sort((a, b) =>
                new Date(a.projects.period.startDate) - new Date(b.projects.period.startDate)
            );
            setAllProjects(sortedProjects);
        }
    };

    return (
        <div className={`filter_by_name-wrap  ${isOpen ? 'open_list-wrap' : ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className='value_sort'>
                <p>By Date <IoIosArrowDown /> </p>
            </div>
            <div className={`sort_var_item ${isOpen ? 'sort_var_item_open' : ''}`}>
                {sortDateArr.map((item, idx) => (
                    <p key={idx} onClick={() => handleSort(item.id)}>
                        {item.name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default FilterByDate;
