import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';


const FilterSearch = () => {

    const [serchValue, setSearchValue] = useState('') 

    return (
        <div className='fillter_search_wrap'>
            <FiSearch/>
            <input id='search_filter_value' value={serchValue} placeholder='search' type="text" onChange={(e) => setSearchValue(e.target.value) } />
        </div>
    );
};

export default FilterSearch;