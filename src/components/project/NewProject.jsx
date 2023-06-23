import React from 'react';
import '../../styles/newProject.scss'
import { Link } from 'react-router-dom';

const NewProject = () => {
    return (
        <div className='new_project_wraper'>
            <div className='profile_title'>
                <h2>Apply</h2>
            </div>
            {/* <div className=''> */}
                
                <div className='input_wrap'>
                    <div className='input_item'>
                        <label htmlFor="name">Name*</label>
                        <input id='name' type="text" />
                    </div>
                    <div className='categori_wrap'>
                    <div className='input_item'>
                        <label htmlFor="categories">Category**</label>
                        <input id='categories' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="subcategory">Subcategory*</label>
                        <input id='subcategory' type="text" />
                    </div>
                    </div>
                    <div className='input_item'>
                        <label htmlFor="description">Description*</label>
                        <textarea id='description' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="request">Request*</label>
                        <textarea id='request' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="team">Team*</label>
                        <input id='team' type="password"  />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="placement">Placement period*</label>
                        <input id='placement' type="password"  />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="terget">Target amount*</label>
                        <input id='target' type="text" />
                    </div>
                    <div className='input_item'>
                        <label htmlFor="bonus">Bonus for investors *</label>
                        <input id='bonus' type="text" />
                    </div>
                    <div className='input_checkbox_wrap'>
                        <div className='input_checkbox_wrap-item'>
                            <input className='checkbox_input' id='remember_me' type="checkbox" />
                            <label htmlFor="remember_me">Confirm user agreement</label>
                        </div>
                        <Link
                        to='/rules'>
                            <p>Rules <img src="./icons/ph_info-light.svg" alt="" /></p>
                        </Link>
                    </div>
                </div>
                <button 
                >Save</button>
            {/* </div> */}
        </div>
    );
};

export default NewProject;