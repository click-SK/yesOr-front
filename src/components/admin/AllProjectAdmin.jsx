import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import ProjectItem from "./ProjectItem";
const AllProjectAdmin = ({
  projectArr,
  verified,
  handleChangeFunc,
  setReloadUserData,
}) => {
  const [projectMainPage, setProjectMainPage] = useState([]);
  const [mainPageProjectIdArray, setMainPageProjectIdArray] = useState([]);
  const [reloadProjectMainPage, setReloadProjectMainPage] = useState(false);

  useEffect(() => {
    try {
      axios.get(`${BASE_URL}/get-project-main-page`).then((res) => {
        setProjectMainPage(res.data);
        let onlyId = [];
        res.data.forEach((item) => {
          onlyId.push(item?.project?._id);
        })
        setMainPageProjectIdArray(onlyId);
      });
    } catch(error) {
        console.log(error);
    }
  }, [reloadProjectMainPage]);

  const reversedProjectArr = [...projectArr].reverse();

  return (
    <div className="project_wrap">
      <div className="project_header">
        <h4>Full name</h4>
        <h4>Сategory</h4>
        <h4>Main info</h4>
        <h4>Budget</h4>
        <h4></h4>
      </div>
      {reversedProjectArr.map((item, idx) => (
        <ProjectItem
          item={item}
          key={item?._id}
          handleChangeFunc={handleChangeFunc}
          verified={verified}
          onlyId={mainPageProjectIdArray}
          projectMainPage={projectMainPage}
          setReload={setReloadProjectMainPage}
        />
      ))}

    </div>
  );
};

export default AllProjectAdmin;
