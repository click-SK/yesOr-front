import React, { useEffect, useState } from 'react';

const FilterBudget = ({ allProjects, setFilteredProjects }) => {
    const [budgetArr, setBudgetArr] = useState([]);
    const [minBudget, setMinBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(10000);
    const [valueBudget, setValueBudget] = useState(maxBudget);

    useEffect(() => {
        const budgetSumArr = allProjects.map((item) => item.projects.target);
        setBudgetArr(budgetSumArr);

        // Знайдіть мінімальне та максимальне значення бюджету
        const min = Math.min(...budgetSumArr);
        const max = Math.max(...budgetSumArr);

        setMinBudget(min);
        setMaxBudget(max);
    }, [allProjects]);

    // Оновлюємо список фільтрованих проектів на основі вибраного діапазону бюджету
    useEffect(() => {
        const filtered = allProjects.filter(
            (project) => project.projects.target <= valueBudget
        );
        setFilteredProjects(filtered);
    }, [valueBudget, allProjects, setFilteredProjects]);

    return (
        <div className='filter_budget_wrap'>
            <div className='title_filt_bidget'>
                <h3>Budget</h3>
            </div>
            <div className='filter_budget_input_wrap'>
                <p>{minBudget}$</p>
                <input
                    style={{padding:'0px'}}
                    className='budget_filter'
                    type='range'
                    value={valueBudget}
                    onChange={(e) => setValueBudget(Number(e.target.value))}
                    min={minBudget}
                    max={maxBudget}
                />
                <p>{maxBudget}$</p>
            </div>
        </div>
    );
};

export default FilterBudget;
