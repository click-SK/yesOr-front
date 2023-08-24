import React, { useState } from 'react';
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
                    // <div className='category_wrap-item' key={idx}>
                    //     <div 
                    //     onClick={() => handleToggle(idx)}
                    //     className={`category_wrap_title ${openStates[idx] ? 'category_wrap_title-active' : ''}`}
                    //     > {item.category} <IoIosArrowDown/> </div>
                    //     <div className={`category_wrap_sub-cat ${openStates[idx] ? 'open_sub_cat' : ''}`}> 
                    //         {/* <button className='category_wrap_sub-close'> X </button> */}
                    //         {item.subcategory.map((el,idx) => (
                    //         <div className='sub_cat_wrap' key={idx}>
                    //                 <input  type="checkbox" id="art_chex" />
                    //                 <p>{el.name}</p>
                    //         </div>
                    //     ))} 
                    //     <button className='category_wrap_sub-show'> Show result </button>
                    //     </div>
                    // </div>
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