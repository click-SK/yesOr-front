import React, { useEffect, useState } from 'react';
import MultiRangeSlider from './rangeSlide/MultiRangeSlider';

const FilterBudget = ({ allProjects, setFilteredProjects }) => {
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [valueBudget, setValueBudget] = useState([minBudget, maxBudget]);

  useEffect(() => {
    const budgetSumArr = allProjects.map((item) => item.projects.target);
    const min = Math.min(...budgetSumArr);
    const max = Math.max(...budgetSumArr);

    setMinBudget(min);
    setMaxBudget(max);
    setValueBudget([min, max]);
  }, [allProjects]);

  useEffect(() => {
    // Фільтрація проектів на основі вибраного діапазону бюджету
    const filtered = allProjects.filter(
      (project) => project.projects.target >= valueBudget[0] && project.projects.target <= valueBudget[1]
    );
    setFilteredProjects(filtered);
  }, [valueBudget, allProjects, setFilteredProjects]);

  // Обробники зміни значень інпутів
  const handleMinBudgetChange = (e) => {
    const newMin = parseFloat(e.target.value);
    if (newMin <= maxBudget) {
      setMinBudget(newMin);
      setValueBudget([newMin, maxBudget]);
    }
  };

  const handleMaxBudgetChange = (e) => {
    const newMax = parseFloat(e.target.value);
    if (newMax >= minBudget) {
      setMaxBudget(newMax);
      setValueBudget([minBudget, newMax]);
    }
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
          onChange={handleMinBudgetChange}
        />
        <MultiRangeSlider
          min={minBudget}
          setMin = {setMinBudget}
          setMax = {setMaxBudget}
          max={maxBudget}
          onChange={(values) => setValueBudget([values.min, values.max])}
        />
        <input
          className='input_range_value'
          type="number"
          value={maxBudget}
          onChange={handleMaxBudgetChange}
        />
      </div>
    </div>
  );
};

export default FilterBudget;
