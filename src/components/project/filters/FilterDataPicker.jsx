import React, { useEffect, useState } from 'react';
import { BsCalendarWeek } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterDataPicker = ({ allProjects, setAllProjects }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState([]);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    useEffect(() => {
        const dateArr = allProjects.map((item) => item.projects.period.startDate);
        setCurrentDate(dateArr);
    }, [allProjects]);

    const formattedSelectedDate = selectedDate
        ? selectedDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
          })
        : null;

    // Фільтрація проектів за обраною датою
    useEffect(() => {
        if (formattedSelectedDate) {
            const filteredProjects = allProjects.filter(
                (project) =>
                    new Date(project.projects.period.startDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                    }) === formattedSelectedDate
            );
            setAllProjects(filteredProjects);
        }
    }, [formattedSelectedDate, allProjects, setAllProjects]);

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
