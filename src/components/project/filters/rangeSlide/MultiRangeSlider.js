import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "../../../../styles/multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange, setMin, setMax }) => {
  // const [minValue, setMinValue] = useState(min);
  // const [maxValue, setMaxValue] = useState(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  // useEffect(() => {
  //   setMin(minValue)
  //   setMax(maxValue)
  // },[minValue, maxValue])


  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(min);
    const maxPercent = getPercent(max);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [min, max, ]);

  // Get min and max values when their props change
  useEffect(() => {
    onChange({ min, max });
  }, [min, max]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={min}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), max - 1);
          setMin(value);
        }}
        className="thumb thumb--left"
        style={{ zIndex: min > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={max}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), min + 1);
          setMax(value);
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
  onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
