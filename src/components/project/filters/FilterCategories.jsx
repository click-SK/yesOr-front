import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterCategories = () => {
    const categotyArr = [
        {
            name:'Art',
            subCat: [
                'Dance',
                'Music',
                'Photo',
                'Cinema',
                'Publishing house',
            ]
        },
        {
            name:'Charity',
            subCat: [
                'Ukraine',
                'Children',
                'Disabled',
                'Aged people',
            ]
        },
        {
            name:'Inventions',
            subCat: [
                'Household',
                'Military',
                'Production',
            ]
        },
    ]
    const [openStates, setOpenStates] = useState(Array(categotyArr.length).fill(false));


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
                {categotyArr.map((item,idx) => (
                    <div className='category_wrap-item' key={idx}>
                        <div 
                        onClick={() => handleToggle(idx)}
                        className={`category_wrap_title ${openStates[idx] ? 'category_wrap_title-active' : ''}`}
                        > {item.name} <IoIosArrowDown/> </div>
                        <div className={`category_wrap_sub-cat ${openStates[idx] ? 'open_sub_cat' : ''}`}> 
                            {/* <button className='category_wrap_sub-close'> X </button> */}
                            {item.subCat.map((el,idx) => (
                            <div className='sub_cat_wrap' key={idx}>
                                    <input  type="checkbox" id="art_chex" />
                                    <p>{el}</p>
                            </div>
                        ))} 
                        <button className='category_wrap_sub-show'> Show result </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterCategories;