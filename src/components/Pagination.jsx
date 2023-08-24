import React, {useState, useEffect} from 'react';
import '../styles/pagination.scss';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
const Pagination = ({dataArray, setFilterArray}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [progressBar, setProgressBar] = useState(0);
    const [currentItems, setСurrentItems] = useState([]);
    // const [itemsPerPage, setItemsPerPage] = useState(1);
    const [indexOfLastItem, setIndexOfLastItem] = useState(1);
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(1);

    const itemsPerPage = 1;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dataArray.length / itemsPerPage); i++) {
        pageNumbers.push(i);
      }

      useEffect(() => {
        const lastItem = currentPage * itemsPerPage;
        const firstItem = lastItem - itemsPerPage;
        const curerent = dataArray.slice(firstItem, lastItem);
        console.log(curerent);
        setIndexOfLastItem(lastItem);
        setIndexOfFirstItem(firstItem);
        setСurrentItems(curerent);
      },[dataArray, currentPage])

      useEffect(() => {
        setFilterArray(currentItems);
      },[currentItems])

      useEffect(() => {
        let length = pageNumbers.length;
        console.log('length',length);
        let progress = (currentPage/length) * 100;
        console.log('progress',progress);
        setProgressBar(progress)
    },[currentPage, dataArray])

    const handleNext = () => {
        if (currentPage < pageNumbers.length) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePrev = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const chosePage = (page) => {
        setCurrentPage(page);
      };

    return (
        <div className='pagination_block'>
          <div className="pagination_button_wrap">
                <div className='btn_wrap-slider btn_up' onMouseDown={(e) => e.preventDefault()} onClick={handlePrev}>
                    <BsArrowLeft />
                </div>
                <div className='btn_wrap-slider btn_down' onMouseDown={(e) => e.preventDefault()} onClick={handleNext}>
                    <BsArrowRight />
                </div>
          </div>
          <div className="pagination_courosel_count">
            <p
              onClick={() => chosePage(pageNumbers[0])}
              className="pagination_count_value"
            >
              {pageNumbers[0]}
            </p>
            <div className="pagination_count_progress">
              <div className="progress_bg"></div>
              <div
                style={{ width: `${progressBar}%` }}
                className="pagination_progress_active"
              ></div>
            </div>
            <p
              onClick={() => chosePage(pageNumbers.length)}
              className="pagination_count_value"
            >
              {pageNumbers.length}
            </p>
          </div>
        </div>
    );
};

export default Pagination;