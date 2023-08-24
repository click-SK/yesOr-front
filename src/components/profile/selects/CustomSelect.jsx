import React, { useState, useRef } from "react";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className="selected-option"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
