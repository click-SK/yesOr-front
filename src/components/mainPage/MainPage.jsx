import React from 'react';
import AboutUsMain from './AboutUsSection';
import ProjectsMain from './ProjectsSection';
import CategoriesSection from './CategoriesSection';
import TeamSection from './TeamSection';
import InformationSection from './InformationSection';
import '../../styles/mainPage.scss'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAdmin } from '../../store/authAdmin';
import { checkAuthUser } from '../../store/authUser';

const MainPage = () => {
    const dispatch = useDispatch();
    const isAuthUser = useSelector((state) => state.authUser.isAuthUser);
    const isAdmin = useSelector((state) => state.authAdmin.isAdmin);

    console.log('isAuthUserMainP',isAuthUser);
    
    const startProjectLink = isAuthUser ? '/new-project' : '/login';

    return (
        <div>
            <section className='section banner_head'>
                <h1 className='banner_head_title'>YOUR CHOICE IS TO DO GOOD OR...</h1>
                <p className='banner_head_descript'>The first and only social project of its kind</p>
                <div className='banner_head_buttons'>
                    <Link
                     to='/discover'>
                        <button>Discover</button>
                    </Link>
                    <Link to={startProjectLink}>
                        <button>Start a project</button>
                    </Link>
                </div>
            </section>
            <AboutUsMain/>
            <ProjectsMain/>
            <CategoriesSection/>
            <TeamSection/>
            <InformationSection/>
        </div>
    );
};

export default MainPage;