import React, { useState } from "react";

const FilterSubCategory = ({el, idx, setSubCatArr,subCatArr}) => {
    const [subCat, setSubCat] = useState([])
    const [isCheckbox, setIsCheckbox] = useState(false)
    
    

    const hendlerCheked = (e) => {
        const updatedSubCatArr = isCheckbox
            ? subCatArr.filter((e) => e !== el.name)
            : [...subCatArr, el.name];

        setSubCatArr(updatedSubCatArr);
        setIsCheckbox(!isCheckbox)
    }

    const hendlerTest = () => {
        console.log('hello');
    }

    // console.log('isCheckbox', isCheckbox);

    return (
        <div  onClick={(e) => hendlerCheked(el.name)} className='sub_cat_wrap'>
                <input  type="checkbox" checked={isCheckbox} id="art_chex" onChange={() => hendlerTest()}/>
                <p>{el.name}</p>
        </div>
    );
};

export default FilterSubCategory;