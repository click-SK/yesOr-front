import React, {useState} from 'react';
import { BsCalendarWeek } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterDataPicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    return (
        <div 
        className='data_picker_wrap'>
            <BsCalendarWeek/>
            <DatePicker
            className='input_date_fillter'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // Формат дати (день/місяць/рік)
            placeholderText="Select a date"
            // Тут ви можете додати інші налаштування DatePicker за потреби
            />
        </div>
    );
};

export default FilterDataPicker;