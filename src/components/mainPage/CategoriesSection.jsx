import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoriesSection = () => {

    const [allCategory, setAllCategory] = useState([]);
    const [catUrl, setCatUrl] = useState('')
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

    const categoriesArr = [
        {
            icon : './icons/icon-people.svg',
            name : 'Name',
            descript : 'Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. '
        },
        {
            icon : './icons/icon-graf.svg',
            name : 'Name',
            descript : 'Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. '
        },
        {
            icon : './icons/icon-react.svg',
            name : 'Name',
            descript : 'Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. '
        },
        {
            icon : './icons/icon-info.svg',
            name : 'Name',
            descript : 'Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. '
        },
        {
            icon : './icons/icon-profile.svg',
            name : 'Name',
            descript : 'Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. '
        },
        {
            icon : './icons/icon-back.svg',
            name : 'Name',
            descript : 'Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. '
        },
    ]

    console.log('allCategory', allCategory);

    const  hendlerOpenCategories = (item) => {
        const nameArr = item.map(item => item.name);
        const catString = nameArr.join(',')
        setCatUrl(catString)
        navigate(`/discover?cat=${catString}`)
    }


    return (
        <section id='categories' className='section categories'>
            <div className='categories__description '>
                <h2  className='section_title categories_description_title'>Categories</h2>
                
            </div>
            <div className='categories_wrap'>
                
                {allCategory.map((item,idx) => (
                    <div 
                    key={idx} 
                    className={`categories_wrap_item ${item.category}`}
                    onClick={() => hendlerOpenCategories (item.subcategory)}>
                        <img className='categories_wrap_item_img' src={`/icons/cat-${idx}.svg`} alt="" />
                        <p className='categories_wrap_title'>{item.category}</p>
                            {item.subcategory.map ((sub, idx) => (
                                <p key={idx} className='categories_wrap_descript'> - {sub.name}</p>
                            ))}

                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;