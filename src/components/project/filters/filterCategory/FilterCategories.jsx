import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import FilterChekbox from './FilterChekbox';

const FilterCategories = ({allCategory, setAllProjects, allProjects,setSubCatArr, setShowResult, subCatArr}) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [openStates, setOpenStates] = useState(Array(allCategory.length).fill(false));

    const handleToggle = (index) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };

    return (
        <div className='filter_budget_wrap'>
            <div className='title_filt_bidget'>
                <h3>Category</h3>
            </div>
            <div className='category_wrap'>
                {allCategory.map((item,idx) => (
                    <FilterChekbox
                    key={idx}
                    item = {item}
                    setSubCatArr = {setSubCatArr}
                    subCatArr={subCatArr}
                    setShowResult={setShowResult}
                    />
                ))}
            </div>
        </div>
    );
};

export default FilterCategories;