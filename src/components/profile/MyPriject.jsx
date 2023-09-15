import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectListTemplate from "../project/ProjectListTemplate";
import Pagination from "../Pagination";
import Loader from "../Loader/Loader";
const MyProject = ({ userProjects }) => {
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'inactive'
  const [paginationArray, setPaginationArray] = useState([]);
  const [reversedActiveProjects, setReversedActiveProjects] = useState([]);
  const [reversedInactiveProjects, setReversedInactiveProjects] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const activeProjects = userProjects.filter((item) => item?.isVerified);
    const inactiveProjects = userProjects.filter((item) => !item?.isVerified);
    setReversedActiveProjects(activeProjects);
    setReversedInactiveProjects(inactiveProjects);
  }, [userProjects]);

  return (
    <>
      {userProjects ? (
        <div className="project_wrap my_project_wrap">
          <ul className="tabs profile_nav">
            <li
              className={`profile_nav_item my_proj_tabs  ${
                activeTab === "active" ? "active_tab" : ""
              }`}
              onClick={() => handleTabChange("active")}
            >
              Active Projects
            </li>
            <li
              className={`profile_nav_item my_proj_tabs  ${
                activeTab === "inactive" ? "active_tab" : ""
              }`}
              onClick={() => handleTabChange("inactive")}
            >
              Inactive Projects
            </li>
          </ul>
          <div className="project_list">
            {activeTab === "active" &&
              paginationArray.map((item) => (
                <Link to={`/project/${item?._id}`} key={item._id}>
                  <ProjectListTemplate item={item} />
                </Link>
              ))}
            {activeTab === "active" && (
              <Pagination
                dataArray={reversedActiveProjects}
                setFilterArray={setPaginationArray}
              />
            )}
            {activeTab === "inactive" &&
              paginationArray.map((item) => (
                <Link to={`/project/${item?._id}`} key={item._id}>
                  <ProjectListTemplate item={item} />
                </Link>
              ))}
            {activeTab === "inactive" && (
              <Pagination
                dataArray={reversedInactiveProjects}
                setFilterArray={setPaginationArray}
              />
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyProject;
