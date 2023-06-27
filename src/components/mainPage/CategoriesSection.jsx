import React from 'react';

const CategoriesSection = () => {

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
    return (
        <section id='categories' className='section categories'>
            <div className='categories__description '>
                <h2 className='section_title categories_description_title'>Categories</h2>
                
            </div>
            <div className='categories_wrap'>
                {categoriesArr.map((item,idx) => (
                    <div className='categories_wrap_item' key={idx}>
                        <img className='categories_wrap_item_img' src={item.icon} alt="" />
                        <p className='categories_wrap_title'>{item.name}</p>
                        <p className='categories_wrap_descript'>{item.descript}</p>
                    </div>
                ))}
            </div>
            {/* <div className='categories_wrap'>
                {categoriesArr.map((item,idx) => (
                    <div className='categories_wrap_item' key={idx}>
                        <img className='categories_wrap_item_img' src={item.icon} alt="" />
                        <p className='categories_wrap_title'>{item.name}</p>
                        <p className='categories_wrap_descript'>{item.descript}</p>
                    </div>
                ))}
            </div> */}
        </section>
    );
};

export default CategoriesSection;