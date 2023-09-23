import React, { useState, useEffect } from "react";
import ArchiveProjectItem from "./ArchiveProjectItem";
import Pagination from "../Pagination";
const AllArchiveProject = ({
  projectArr,
}) => {
  const [reversedProjectArr, setReversedProjectArr] = useState([]);
  const [paginationArray, setPaginationArray] = useState([]);

  useEffect(() => {
    const reverse = [...projectArr].reverse();
    setReversedProjectArr(reverse)
  },[projectArr])

  return (
    <div className="project_wrap">
      <div className="project_header">
      </div>
      {paginationArray.map((item, idx) => (
        <ArchiveProjectItem
          item={item}
          key={item?._id}
        />
      ))}
      <Pagination dataArray={reversedProjectArr} setFilterArray={setPaginationArray}/>
    </div>
  );
};

export default AllArchiveProject;
