import React, { useEffect, useRef, useState  } from 'react';
import PropTypes from 'prop-types';
import "../../../../styles/multiRangeSlider.css";

const MultiRangeSlider = ({ allProjects, min, max, onChange }) => {
  const range = useRef(null);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(10000);

  useEffect(() => {
    const budgetSumArr = allProjects.map((item) => item.projects.target);
    const min = Math.min(...budgetSumArr);
    const max = Math.max(...budgetSumArr);

    setMinBudget(min);
    setMaxBudget(max);
  }, [allProjects]);

  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    const minPercent = getPercent(min);
    const maxPercent = getPercent(max);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [min, max]);



  return (
    <div className="container">
      <input
        type="range"
        min={minBudget}
        max={maxBudget}
        value={min}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), max - 1);
          onChange(value, max);
        }}
        className="thumb thumb--left"
        style={{ zIndex: min > max - 100 && "5" }}
      />
      <input
        type="range"
        min={minBudget}
        max={maxBudget}
        value={max}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), min + 1);
          onChange(min, value);
        }}
        className="thumb thumb--right"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{min}</div>
        <div className="slider__right-value">{max}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
