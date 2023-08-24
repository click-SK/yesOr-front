import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const FilterSearch = ({ allProjects, setAllProjects, initialProjects }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = initialProjects.filter(
            (project) =>
                project.projects && project.projects.name.toLowerCase().includes(searchTerm)
        );
        setAllProjects(filteredProjects);
        setSearchValue(searchTerm);
    };

    return (
        <div className='fillter_search_wrap'>
            <FiSearch />
            <input
                id='search_filter_value'
                value={searchValue}
                placeholder='search'
                type='text'
                onChange={handleSearch}
            />
        </div>
    );
};

export default FilterSearch;
