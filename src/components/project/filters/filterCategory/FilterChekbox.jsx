import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterSubCategory from "./FilterSubCategory";

const FilterChekbox = ({ item, idx, allCategory,setShowResult,subCatArr, setSubCatArr, showResult}) => {
    // const [openStates, setOpenStates] = useState(Array(allCategory.length).fill(false));
    const [isOpen, setIsOpen] = useState(false)
    // const [subCatArr, setSubCatArr] = useState([])

    // const handleToggle = (index) => {
    //     const newOpenStates = [...openStates];
    //     newOpenStates[index] = !newOpenStates[index];
    //     setOpenStates(newOpenStates);
    // };

    // console.log('subCatArr',subCatArr);
    
  return (
    <div className='category_wrap-item' >
    <div 
    onClick={() => setIsOpen(!isOpen)}
    className={`category_wrap_title ${isOpen ? 'category_wrap_title-active' : ''}`}
    > {item.category} <IoIosArrowDown/> </div>
    <div className={`category_wrap_sub-cat ${isOpen ? 'open_sub_cat' : ''}`}> 
        {/* <button className='category_wrap_sub-close'> X </button> */}
        {item.subcategory.map((el,idx) => (
          <FilterSubCategory
          key={idx}
          el={el}
          setSubCatArr={setSubCatArr}
          subCatArr={subCatArr}
          />

    ))} 
    <button
    onClick={() => setShowResult(state => !state)}
    className='category_wrap_sub-show'> Show result </button>
    </div>
</div>
  );
};

export default FilterChekbox;
