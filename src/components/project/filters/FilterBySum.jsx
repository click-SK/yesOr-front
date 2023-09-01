import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterBySum = ({ allProjects, setAllProjects }) => {
    const [sortVar, setSortVar] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const sortBudgetArr = [
        {
            id: 1,
            name: 'Lowest Budget First'
        },
        {
            id: 2,
            name: 'Highest Budget First'
        },
    ];

    const handleSort = (sortId) => {
        setSortVar(sortId);
        setIsOpen(false);

        if (sortId === 1) {
            const sortedProjects = allProjects.slice().sort((a, b) =>
                a.projects.target - b.projects.target
            );
            setAllProjects(sortedProjects);
        } else if (sortId === 2) {
            const sortedProjects = allProjects.slice().sort((a, b) =>
                b.projects.target - a.projects.target
            );
            setAllProjects(sortedProjects);
        }
    };

    return (
        <div className={`filter_by_name-wrap  ${isOpen ? 'open_list-wrap' : ''}`}>
            <div onClick={() => setIsOpen(!isOpen)} className='value_sort'>
                <p>By Budget <IoIosArrowDown /> </p>
            </div>
            <div className={`sort_var_item ${isOpen ? 'sort_var_item_open' : ''}`}>
                {sortBudgetArr.map((item, idx) => (
                    <p key={idx} onClick={() => handleSort(item.id)}>
                        {item.name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default FilterBySum;