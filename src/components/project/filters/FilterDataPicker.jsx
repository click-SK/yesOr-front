import React, { useEffect, useState } from 'react';
import { BsCalendarWeek } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterDataPicker = ({selectedDate, setSelectedDate, handlePlacementPeriod}) => {

    const handleDateChange = (date) => {
      setSelectedDate(date);
      handlePlacementPeriod(date);
    };

    return (
        <div className='data_picker_wrap'>
            <BsCalendarWeek />
            <DatePicker
                className='input_date_fillter'
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat='dd/MM/yyyy'
                placeholderText='Select a date'
            />
        </div>
    );
};

export default FilterDataPicker;
