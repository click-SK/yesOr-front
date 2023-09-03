import React, { useEffect, useState } from 'react';
import MultiRangeSlider from './rangeSlide/MultiRangeSlider';

const FilterBudget = ({ allProjects, setFilteredProjects }) => {
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000);

  useEffect(() => {
    const budgetSumArr = allProjects.map((item) => item.projects.target);
    const min = Math.min(...budgetSumArr);
    const max = Math.max(...budgetSumArr);

    setMinBudget(min);
    setMaxBudget(max);
  }, [allProjects]);

  useEffect(() => {
    const filtered = allProjects.filter(
      (project) => project.projects.target >= minBudget && project.projects.target <= maxBudget
    );
    setFilteredProjects(filtered);
  }, [minBudget, maxBudget, allProjects, setFilteredProjects]);

  const handleBudgetChange = (newMin, newMax) => {
    setMinBudget(newMin);
    setMaxBudget(newMax);
  };

  return (
    <div className='filter_budget_wrap'>
      <div className='title_filt_bidget'>
        <h3>Budget</h3>
      </div>
      <div className='filter_budget_input_wrap'>
        <input
          className='input_range_value'
          type="number"
          value={minBudget}
          onChange={(e) => handleBudgetChange(parseFloat(e.target.value), maxBudget)}
        />
        <MultiRangeSlider
          allProjects={allProjects}
          min={minBudget}
          max={maxBudget}
          onChange={handleBudgetChange}
        />
        <input
          className='input_range_value'
          type="number"
          value={maxBudget}
          onChange={(e) => handleBudgetChange(minBudget, parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default FilterBudget;
