import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterByName = () => {

    const [sortVar, setSortVar] =useState(1)
    const [isOpen, setIsOpen] = useState(false)

    const sortNameArr = [
        {
            id: 1,
            name: 'from A to Z'
        },
        {
            id: 2,
            name: 'from Z to A'
        },
    ]

    console.log(isOpen);

    return (
        <div className='filter_by_name-wrap'>
            <div onClick={() => setIsOpen(!isOpen)} className='value_sort'> <p>By Name <IoIosArrowDown/> </p> </div>
                <div className={`sort_var_item ${isOpen ? 'sort_var_item_open' : ''}`}>
                    {sortNameArr.map((item, idx) => (
                        <p key={idx}>{item.name}</p>
                    ))}    
                </div>
        </div>
    );
};

export default FilterByName;