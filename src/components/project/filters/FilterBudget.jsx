import React, { useState } from 'react';



const FilterBudget = () => {

    return (
        <div className='filter_budget_wrap'>
            <div className='title_filt_bidget'>
                <h3>Budget</h3>
            </div>
            <div className='filter_budget_input_wrap'>
                <p>1000$</p>
                <input className='budget_filter' type="range" />
                <p>10000$</p>
            </div>
        </div>
    );
};

export default FilterBudget;