import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const FilterSubCategory = ({ el, idx, setSubCatArr, subCatArr }) => {
    const [isCheckbox, setIsCheckbox] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Отримати параметри запиту з URL
        const params = new URLSearchParams(location.search);
        
        // Отримати значення параметра "cat"
        const catParam = params.get("cat");
        
        // Розбити значення на масив субкатегорій
        const initialSubCats = catParam ? catParam.split(',') : [];
        
        // Встановити початковий стан на основі URL
        if (initialSubCats.includes(el.name)) {
            setIsCheckbox(true);
            if (!subCatArr.includes(el.name)) {
                setSubCatArr([...subCatArr, el.name]);
            }
        }
    }, [location]);
    

    const hendlerCheked = (e) => {
        const updatedSubCatArr = isCheckbox
            ? subCatArr.filter((e) => e !== el.name)
            : [...subCatArr, el.name];
        
        setSubCatArr(updatedSubCatArr);
        
        // Оновити URL
        navigate(`?cat=${updatedSubCatArr.join(',')}`, { replace: true });
        
        setIsCheckbox(!isCheckbox);
        
        console.log('isCheckbox',isCheckbox);
    };

    return (
        <div className='sub_cat_wrap'>
            <input type="checkbox" checked={isCheckbox} id="art_chex" onChange={(e) => hendlerCheked(el.name)}/>
            <p>{el.name}</p>
        </div>
    );
};

export default FilterSubCategory;
