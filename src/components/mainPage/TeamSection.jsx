import React from 'react';

const TeamSection = () => {
    return (
        <section className='section about_us'>
            <div className='about_us_description'>
                <h2 className='section_title about_us_description_title'>About Us</h2>
                <div className='about_us_description_text'>
                    <p>The Charitable Foundation is made up of dedicated agents and employees of Berkshire Hathaway HomeServices California Properties who want to make a positive and constructive impact on our local communities.</p>
                    <p>Since its inception, the Charitable Foundation has provided hundreds of grants to local organizations involved in health, education, society and the environment. We also actively donate our time and talents to the causes we support.</p>
                </div>
            </div>
            <div className='about_us_courosel'>
                <div className='about_us_img_wrap'>
                    <img src="./mainPage/courosel/aboutUs/image 1.png" alt="" />
                    <img src="./mainPage/courosel/aboutUs/image 2.png" alt="" />
                </div>
                <div className='courosel_count'>
                    <p className='count_value'>01</p>
                    <div className='count_progress'>
                        <div className='progress_bg'></div>
                        <div className='progress_active'></div>
                    </div>
                    <p className='count_value'>05</p>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;