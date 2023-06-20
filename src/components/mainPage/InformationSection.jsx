import React from 'react';

const InformationSection = () => {
    return (
        <section id='information' className='section information'>
            <div className='bg_courosel'></div>
            <div className='information_description'>
                <h2 className='section_title information_description_title'>Information</h2>
                <div className='information_description_text'>
                    <p>Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. Scelerisque nunc augue ornare pretium egestas at ut nec in. </p>
                    <p>Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. Scelerisque nunc augue ornare pretium egestas at ut nec in. </p>
                    <p>Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. Scelerisque nunc augue ornare pretium egestas at ut nec in. </p>
                    <p>Lorem ipsum dolor sit amet consectetur. Sem vulputate arcu convallis aliquam diam sagittis tortor. Scelerisque nunc augue ornare pretium egestas at ut nec in. </p>
                    
                </div>
            </div>
            <div className='information_courosel'>
                <div className='information_img_wrap'>
                    <img src="./mainPage/information_section/foto1.png" alt="" />
                    <img src="./mainPage/information_section/foto2.png" alt="" />
                    <img src="./mainPage/information_section/foto3.png" alt="" />
                    <img src="./mainPage/information_section/foto4.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default InformationSection;