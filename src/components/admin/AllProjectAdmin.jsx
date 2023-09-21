import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import ProjectItem from "./ProjectItem";
import Pagination from "../Pagination";
const AllProjectAdmin = ({
  projectArr,
  verified,
  handleChangeFunc,
  setReloadUserData,
}) => {
  const [projectMainPage, setProjectMainPage] = useState([]);
  const [mainPageProjectIdArray, setMainPageProjectIdArray] = useState([]);
  const [reloadProjectMainPage, setReloadProjectMainPage] = useState(false);
  const [reversedProjectArr, setReversedProjectArr] = useState([]);
  const [paginationArray, setPaginationArray] = useState([]);
  const [isOpenChat, setIsOpenChat] = useState(false)

  useEffect(() => {
    const reverse = [...projectArr].reverse();
    setReversedProjectArr(reverse)
  },[projectArr])

  useEffect(() => {
      axios.get(`${BASE_URL}/get-project-main-page`).then((res) => {
        setProjectMainPage(res.data);
        let onlyId = [];
        res.data.forEach((item) => {
          onlyId.push(item?.project?._id);
        })
        setMainPageProjectIdArray(onlyId);
      }).catch((error) => {
        console.log('Request error',error);
    })
  }, [reloadProjectMainPage]);

  // const reversedProjectArr = [...projectArr].reverse();

  return (
    <div className="project_wrap">
      <div className="project_header">
        <h4>Full name</h4>
        <h4>Сategory</h4>
        <h4>Main info</h4>
        <h4>Budget</h4>
        <h4></h4>
      </div>
      {paginationArray.map((item, idx) => (
        <ProjectItem
          item={item}
          key={item?._id}
          handleChangeFunc={handleChangeFunc}
          verified={verified}
          onlyId={mainPageProjectIdArray}
          projectMainPage={projectMainPage}
          setReload={setReloadProjectMainPage}
          setIsOpenChat={setIsOpenChat}
          isOpenChat={isOpenChat}
        />
      ))}
      <Pagination dataArray={reversedProjectArr} setFilterArray={setPaginationArray}/>
    </div>
  );
};

export default AllProjectAdmin;
