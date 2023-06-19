import React from 'react';
import AboutUsMain from './AboutUsSection';
import ProjectsMain from './ProjectsSection';
import CategoriesSection from './CategoriesSection';
import TeamSection from './TeamSection';
import '../../styles/mainPage.scss'

const MainPage = () => {
    return (
        <div>
            <section className='section banner_head'>
                <h1 className='banner_head_title'>YOUR CHOICE IS TO DO GOOD OR...</h1>
                <p className='banner_head_descript'>The first and only social project of its kind</p>
                <div className='banner_head_buttons'>
                    <button>Discover</button>
                    <button>Start a project</button>
                </div>
            </section>
            <AboutUsMain/>
            <ProjectsMain/>
            <CategoriesSection/>
            <TeamSection/>
        </div>
    );
};

export default MainPage;