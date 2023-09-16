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
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';

const ProjectAllList = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isOpenAllUsers, setIsOpenAllUsers] = useState(true);
    const [isOpenArchive, setIsOpenArchive] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [initialProjects, setInitialProjects] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [subCatArr, setSubCatArr] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loadPage, setLoadPage] = useState(false)
    const [paginationArray, setPaginationArray] = useState([]);
    const [allArchiveProject, setAllArchiveProject] = useState([]);
    const { search } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-verified-projects`)
            .then((res) => {
                setAllProjects(res.data);
                setInitialProjects(res.data);
                setTimeout(() => {
                    setLoadPage(true)
                },500)
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

      useEffect(() => {
        try {
          axios.get(`${BASE_URL}/get-allarchive-projects`)
          .then((res) => setAllArchiveProject(res.data))
      } catch(error) {
          console.log(error);
      }
    },[])

    const handleSubCatArrChange = () => {
        // console.log('funk work');
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
            // console.log('filteredProjects', filteredProjects);
            
            // Оновлюємо список проектів
            setAllProjects(filteredProjects);
        }
    };

    useEffect(() => {
      if (subCatArr.length !== 0 && initialProjects.length !== 0 && allProjects.length !== 0){
        // const timer = setTimeout(() => {
            //     console.log('say Hi');
            
            // }, 500); 
            
            // return () => clearTimeout(timer); 
                handleSubCatArrChange()
      
      }
  }, [ initialProjects]);

//   console.log('findErr', paginationArray);

    useEffect(() => {

        const params = new URLSearchParams(search);
        const initialSubcategories = params.get('cat');
        
        if (initialSubcategories) {
            setSubCatArr(initialSubcategories.split(','));
        }
        
        // Завантаження проектів, категорій, тощо
    }, []);




    const openProject = () =>{
        setIsOpenAllUsers(true);
        setIsOpenArchive(false);
        // setAllProjects(allProjects)
        setPaginationArray(allProjects)
    }

    const openArchive = () =>{
        setIsOpenAllUsers(false);
        setIsOpenArchive(true);
        setPaginationArray(allArchiveProject)
    }

    console.log('allProjects', allProjects);

    return (
        <>
        {loadPage 
        ?
        <div className='profile_wrap'>
        <div className='profile_title'>
            <h2>Project</h2>
            <ul className='profile_nav'>
            <li
            onClick={() => openProject()}
             className={`profile_nav_item ${isOpenAllUsers ? 'profile_nav_item-active' : ''}`}>All projects</li>
            <li 
            onClick={() => openArchive()}
            className={`profile_nav_item ${isOpenArchive ? 'profile_nav_item-active' : ''}`}>Archive</li>
        </ul>
            <div className='top_filters'>
                <FilterSearch 
                    allProjects={allProjects}
                    setAllProjects={setPaginationArray}
                    initialProjects={initialProjects}
                />
                <FilterByDate
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
                    {paginationArray.length !== 0 ?
                        <>
                        {paginationArray.length !== 0 && paginationArray.map((item) => (
                            <Link to={`/project/${item?.projects?._id}`} key={item._id}>
                                <ProjectListTemplate item={item?.projects} />
                            </Link>
                        ))}
                        </>
                        :
                        <h3>There are no projects in this category</h3>
                    }
                </div>
                <Pagination dataArray={allProjects} setFilterArray={setPaginationArray}/>
            </div>
        </div>
    </div>
        :
        <Loader/>}
        </>
    );
};

export default ProjectAllList;
