import React, { useState, useEffect, useRef } from "react";
import "../styles/select.scss";

const SelectChoseCategory = ({ item, title, state, setState, isCategory, isSubcategory }) => {
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

  const selectItemFunc = (e) => {
    console.log('e',e);
    setState(e);
    setIsOpen(false);
  };

  return (
    <div style={{ width: "100%" }} id="select-second" ref={selectRef}>
      <h3>{title}</h3>
      <div className="custom-select">
        <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
          {isCategory && (state && state.category) || item[0].category}
          {isSubcategory && (state && state.name) || item[0].name}
        </div>
        {isOpen && (
          <div className="options">
            {item.map((el) => (
              <div
                className="option"
                key={el._id}
                onClick={() => selectItemFunc(el)}
              >
                {isCategory && el.category}
                {isSubcategory && el.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectChoseCategory;
