import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import CatSlider from './categoriesSlider/CatSlider';

const CategoriesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [allCategory, setAllCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios
              .get(`${BASE_URL}/get-all-category`)
              .then((res) => setAllCategory(res.data));
          } catch(error) {
              console.log(error);
          }
      }, []);



    const  hendlerOpenCategories = (item) => {
        const nameArr = item.map(item => item.name);
        const catString = nameArr.join(',')
        navigate(`/discover?cat=${catString}`)
    }

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (prevSlide >= allCategory.length - 1) {
                return 0;
            }
            return prevSlide + 1;
        });
    };
    
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (prevSlide === 0) {
                return allCategory.length - 1;
            }
            return prevSlide - 1;
        });
    };


    return (
        <section id='categories' className='section categories'>
            <div className='categories__description '>
                <h2  className='section_title categories_description_title'>Categories</h2>
                
            </div>
            <div className='categories_wrap categories_wrap-over_850'>
                {allCategory.map((item,idx) => (
                    <div 
                    key={idx} 
                    className={`categories_wrap_item ${item.category}`}
                    onClick={() => hendlerOpenCategories (item.subcategory)}>
                        <img className='categories_wrap_item_img' src={`./mainPage/icons/cat-${idx}.svg`} alt="" />
                        <p className='categories_wrap_title'>{item.category}</p>
                            {item.subcategory.map ((sub, idx) => (
                                <p key={idx} className='categories_wrap_descript'> - {sub.name}</p>
                            ))}
                    </div>
                ))}
            </div>
            <div style={{marginTop:'100px'}} className='categories_wrap-850' >
                <CatSlider/>
            </div>
        </section>
    );
};

export default CategoriesSection;