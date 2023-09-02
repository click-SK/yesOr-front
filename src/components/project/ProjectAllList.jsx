import React, { useState, useEffect } from 'react';
import ProjectPage from '../project/ProjectPage';
import FilterBudget from './filters/FilterBudget';
import FilterCategories from './filters/filterCategory/FilterCategories';
import FilterDataPicker from './filters/FilterDataPicker';
import FilterSearch from './filters/FilterSearch';
import FilterByName from './filters/FilterByName';
import FilterByDate from './filters/FilterByDate';
import FilterBySum from './filters/FilterBySum';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import ProjectListTemplate from './ProjectListTemplate';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { BiArrowFromRight, BiArrowFromLeft, BiArrowFromBottom } from 'react-icons/bi';
import MultiRangeSlider from './filters/rangeSlide/MultiRangeSlider';

const ProjectAllList = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [initialProjects, setInitialProjects] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [subCatArr, setSubCatArr] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [paginationArray, setPaginationArray] = useState([]);
    

    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-verified-projects`)
            .then((res) => {
                setAllProjects(res.data);
                setInitialProjects(res.data);
            });
        } catch(error) {
            console.log(error);
        }
    },[]);

    useEffect(() => {
        try {
            axios
              .get(`${BASE_URL}/get-all-category`)
              .then((res) => setAllCategory(res.data));
          } catch(error) {
              console.log(error);
          }
      }, []);

    const handleSubCatArrChange = () => {
        if (subCatArr.length === 0) {
            // Якщо subCatArr порожній, показуємо всі проекти
            setAllProjects(initialProjects);
        } else {
            // Фільтруємо проекти за обраними субкатегоріями
            const filteredProjects = allProjects.filter((project) => {
                const projectSubcategories = project?.projects?.subcategory || [];
                return subCatArr.some((subcat) =>
                    projectSubcategories.includes(subcat)
                );
            });
    
            // Оновлюємо список проектів
            setAllProjects(filteredProjects);
        }
    };

    return (
        <div className='profile_wrap'>
            <div className='profile_title'>
                <h2>Project</h2>
                <div className='top_filters'>
                    {/* <FilterDataPicker
                     allProjects={allProjects}
                     setAllProjects={setFilteredProjects}/> */}
                    <FilterBySum
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    />
                    <FilterByDate
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    />
                    <FilterSearch 
                        allProjects={allProjects}
                        setAllProjects={setPaginationArray}
                        initialProjects={initialProjects}
                    />
                    <FilterByName
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    />
                </div>
            </div>
            <div className={`profile_content_wraper project_content_wraper `}>
                <div 
                onClick={() => setIsOpenAside(state => !state)}
                className='btn-open-aside'>
                     <p>Filters</p>
                     <BiArrowFromBottom/>
                </div>
                <div className={`aside_filters ${isOpenAside ? 'open-aside' : 'close-aside'}`}>
                    <div
                    className='btn-close-aside'>
                        <BiArrowFromRight
                        onClick={() => setIsOpenAside(state => !state)}
                        />
                    </div>
                    <FilterByName
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    />
                    <FilterBySum
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    />
                    <FilterByDate
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    />
                    <FilterBudget
                    allProjects={allProjects}
                    setAllProjects={setAllProjects}
                    filteredProjects = {filteredProjects}
                    setFilteredProjects = {setPaginationArray}
                    />
                    {/* <MultiRangeSlider
                    min={0}
                    max={1000}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                    /> */}
                    <FilterCategories
                    allCategory = {allCategory}
                    setAllProjects={setPaginationArray}
                    allProjects = {allProjects}
                    setSubCatArr={setSubCatArr}
                    setShowResult={handleSubCatArrChange}
                    subCatArr={subCatArr}
                    />
                </div>
                <div className='project_wrap project_wrap_page'>
                    <div className='warp_project_list'>
                        {paginationArray.length !== 0 && paginationArray.map((item) => (
                            <Link to={`/project/${item?.projects?._id}`} key={item._id}>
                                <ProjectListTemplate item={item?.projects} />
                            </Link>
                        ))}
                    </div>
                    <Pagination dataArray={allProjects} setFilterArray={setPaginationArray}/>
                </div>
            </div>
        </div>
    );
};

export default ProjectAllList;
