import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FilterSubCategory from "./FilterSubCategory";

const FilterChekbox = ({ item, idx, allCategory,setShowResult,subCatArr, setSubCatArr, showResult}) => {
    const [isOpen, setIsOpen] = useState(false)

  //   useEffect(() => {
  //     if (subCatArr){
  //       const timer = setTimeout(() => {
  //         setShowResult(state => !state);
  //       }, 500); 
    
  //       return () => clearTimeout(timer); 
      
  //     }
  // }, []);

  // useEffect(() => {
  //   if (subCatArr.length !== 0){
  //     setShowResult(state => !state)
  //   }
  // }, [])




    
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
    onClick={setShowResult}
    className='category_wrap_sub-show'> Show result </button>
    </div>
</div>
  );
};

export default FilterChekbox;
