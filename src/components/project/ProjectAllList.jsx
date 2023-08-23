import React, { useState, useEffect } from 'react';
import ProjectPage from '../project/ProjectPage';
import FilterBudget from './filters/FilterBudget';
import FilterCategories from './filters/filterCategory/FilterCategories';
import FilterDataPicker from './filters/FilterDataPicker';
import FilterSearch from './filters/FilterSearch';
import FilterByName from './filters/FilterByName';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import ProjectListTemplate from './ProjectListTemplate';
import { Link } from 'react-router-dom';



const ProjectAllList = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [initialProjects, setInitialProjects] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [subCatArr, setSubCatArr] = useState([])
    const [showResult, setShowResult] = useState(false)
    

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



    // console.log('allCategory',allProjects.projects.subcategory);
    // console.log('subCatArr',subCatArr);


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

    // console.log('allProjects', allProjects);

    return (
        <div className='profile_wrap'>
            <div className='profile_title'>
                <h2>Project</h2>
                <div className='top_filters'>
                    <FilterDataPicker/>
                    <FilterSearch 
                        allProjects={allProjects}
                        setAllProjects={setFilteredProjects}
                        initialProjects={initialProjects}
                    />
                    <FilterByName
                    allProjects={allProjects}
                    setAllProjects={setFilteredProjects}
                    />
                </div>
            </div>
            <div className='profile_content_wraper project_content_wraper'>
                <div className='aside_filters'>
                    <FilterBudget
                    allProjects={allProjects}
                    setAllProjects={setAllProjects}
                    filteredProjects = {filteredProjects}
                    setFilteredProjects = {setFilteredProjects}
                    />
                    <FilterCategories
                    allCategory = {allCategory}
                    setAllProjects={setFilteredProjects}
                    allProjects = {allProjects}
                    setSubCatArr={setSubCatArr}
                    setShowResult={handleSubCatArrChange}
                    subCatArr={subCatArr}
                    />
                </div>
                <div className='project_wrap project_wrap_page'>
                    {filteredProjects.length !== 0 && filteredProjects.map((item) => (
                        <Link to={`/project/${item?.projects?._id}`} key={item._id}>
                            <ProjectListTemplate item={item?.projects} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectAllList;
