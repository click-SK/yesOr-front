import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterByName = ({ allProjects, setAllProjects }) => {
    const [sortVar, setSortVar] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const sortNameArr = [
        {
            id: 1,
            name: 'from A to Z'
        },
        {
            id: 2,
            name: 'from Z to A'
        },
    ];

    const handleSort = (sortId) => {
        setSortVar(sortId);
        setIsOpen(false);

        if (sortId === 1) {
            const sortedProjects = allProjects.slice().sort((a, b) =>
                a.projects.name.localeCompare(b.projects.name)
            );
            setAllProjects(sortedProjects);
        } else if (sortId === 2) {
            const sortedProjects = allProjects.slice().sort((a, b) =>
                b.projects.name.localeCompare(a.projects.name)
            );
            setAllProjects(sortedProjects);
        }
    };

    return (
        <div className='filter_by_name-wrap'>
            <div onClick={() => setIsOpen(!isOpen)} className='value_sort'>
                <p>By Name <IoIosArrowDown /> </p>
            </div>
            <div className={`sort_var_item ${isOpen ? 'sort_var_item_open' : ''}`}>
                {sortNameArr.map((item, idx) => (
                    <p key={idx} onClick={() => handleSort(item.id)}>
                        {item.name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default FilterByName;
