import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import "../../../../styles/multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, onChange, setMin, setMax }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

//   useEffect(() => {
//     setMin(minValue)
//     setMax(maxValue)
//   },[minValue, maxValue])


  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue, min, max]);

  // Get min and max values when their props change
  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxValue - 1);
          setMinValue(value);
        }}
        className="thumb thumb--left"
        style={{ zIndex: minValue > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minValue + 1);
          setMaxValue(value);
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minValue}</div>
        <div className="slider__right-value">{maxValue}</div>
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
