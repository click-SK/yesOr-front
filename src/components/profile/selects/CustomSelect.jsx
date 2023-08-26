import React, { useState, useEffect, useRef } from "react";
import "../../../styles/select.scss";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`} ref={selectRef}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {value}
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              className="option"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
