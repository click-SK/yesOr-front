import React from 'react';
import '../styles/404.scss';
import { Link } from 'react-router-dom';
const Page404 = () => {
    return (
        <div className='page404_wrap'>
            <p className='page404_info'>Page not found</p>
            <p className='page404_text'>404</p>
            <Link className='page404_link' to='/'>Go to main page</Link>
        </div>
    );
};

export default Page404;