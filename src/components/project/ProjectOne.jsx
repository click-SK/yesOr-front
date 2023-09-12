import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../http/baseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import "../../styles/projectPage.scss";
// import moment from "moment";
// import { useNavigate } from 'react-router-dom';
import DonatsModal from "./donatsComp/DonatsModal";
import HistoryDonats from "./historiDonats/HistoryDonats";
import ModalComent from "./ModalComent";
import EditProject from "../profile/EditProject";
import SliderProject from "./SliderProject";
import ProjectComments from "./ProjectComments";
import ProjectdonatsHistory from "./ProjectdonatsHistory";
import CountingTime from "./CountingTime";
const ProjectOne = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [isOpenDonat, setIsOpenDonat] = useState(false);
  const [isOpenEditProject, setIsOpenEditProject] = useState(false);
  const [isOpenComent, setIsOpenComent] = useState(false);
  const [donatsValue, setDonatsValue] = useState(0);
  const [fullName, setFullName] = useState("");
  const [percentCollected, setPercentCollected] = useState(0);
  const [reloadProject, setReloadProject] = useState(0);

  const [commentsArr, setComentsArr] = useState([
    {
      img: "/file/proj/1.png",
      name: "fullname",
      coment:
        "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.  ",
      date: "24.08.2023",
    },
    {
      img: "/file/proj/1.png",
      name: "fullname 2",
      coment:
        "22222222222222222222222222222222222222",
      date: "24.08.2023",
    },
  ]);

  const [currentImg, setCurrentImg] = useState('');
  const [imgProject, setImgProject] = useState([]);

  const { user } = useSelector((state) => state.authUser.user);
  const navigate = useNavigate();
  const currentExtension = currentImg && currentImg.split(".").pop(); // Отримуємо розширення файлу

  useEffect(() => {
    try {
      const url = window.location.href;
      const urlParts = url.split("/");
      const id = urlParts[urlParts.length - 1];
      setProjectId(id);
    } catch(error) {

    }
  }, []);

  useEffect(() => {
    try {
      if (projectId) {
        axios.get(`${BASE_URL}/get-one-project/${projectId}`).then((res) => {
          setCurrentProject(res.data);
          setImgProject(res.data.projectMedia);
          setCurrentImg(res.data.projectMedia[0]);
        });
      }
    } catch(error) {
      console.log(error);
    }
  }, [projectId, reloadProject]);

  const handleSavedProject = () => {
    try {
        axios
          .patch(`${BASE_URL}/saved-project`, {
            userId: user._id,
            projectId: currentProject._id,
          })
          .then(() => window.location.reload());
      } catch(error) {
        console.log(error);
      }
  };
  const handleRemoveSavedProject = () => {
    try {
        axios
          .patch(`${BASE_URL}/remove-saved-project`, {
            userId: user._id,
            projectId: currentProject._id,
          })
          .then(() => window.location.reload());
      } catch(error) {
        console.log(error);
      }
  };

  const handleStarRating = () => {
    try {
      if (
        user &&
        currentProject &&
        user.savedProjects.includes(currentProject._id)
      ) {
        handleRemoveSavedProject();
      } else {
        handleSavedProject();
      }
    } catch(error) {
      console.log(error);
    }
  };

  const handleSendProjectToArchive = () => {
    try {
      axios.post(`${BASE_URL}/add-project-archive`, {
        projectId: currentProject._id,
      }).then(() => {
        alert('Project added to archive')
      })
    }catch(error) {
      console.log(error);
    }
  }

  console.log('percentCollected',percentCollected);

  return (
    <div className="project_wraper">
      {isOpenEditProject && (
        <EditProject
          selectedProject={currentProject}
          setIsOpen={setIsOpenEditProject}
        />
      )}
      <div className="btn_back">
        <button onClick={() => navigate(-1)}>Back</button>
        {currentProject && user && currentProject?.user == user?._id && !currentProject.isVerified && (
          <button onClick={() => setIsOpenEditProject(!isOpenEditProject)}>
            Edite
          </button>
        )}
      </div>
      <div className="profile_title">
        <h2>Project</h2>
      </div>
      <div className="project_info">
        <div className="left_column">
          <div className="target_wrap">
            <div className="target_wrap_title">
              <p>{currentProject?.target} $</p>
            </div>
            <div className="target_range">
              <div
                className="target_curent"
                style={{ width: `${percentCollected}%` }}
              ></div>
            </div>
            <p style={{ width: `${percentCollected}%`, textAlign: "right", maxWidth:'100%' }}>
              {percentCollected.toFixed(2)}%
            </p>
          </div>
          {percentCollected >= 100 && currentProject && user && currentProject?.user == user?._id && currentProject?.isVerified &&
          <div>
          <button onClick={handleSendProjectToArchive}>Close project</button>
        </div>
          }
          <SliderProject
          currentExtension = {currentExtension}
          BASE_URL = {BASE_URL}
          currentImg = {currentImg}
          imgProject = {imgProject}
          setCurrentImg = {setCurrentImg}
          />

          <div className="project_description-info">
            <h4>Description</h4>
            <p className="descript_text">{currentProject?.description}</p>
          </div>
          <div className="project_amount">
            <div>
              <h4>Target amount</h4>
              <p>{currentProject?.target}</p>
            </div>
            <div>
              <h4>Colected amount</h4>
              <p>{currentProject?.amountCollected}</p>
            </div>
          </div>
        </div>
        <div className="right_column">
          <CountingTime currentProject={currentProject} setPercentCollected={setPercentCollected}/>
          <div className="project_name_wrap">
            <img src={user?.userImage ? user?.userImage : '/icons/no-avatar.webp'} alt="" />
            <div>
              <h4>Name</h4>
              <p>{currentProject?.name} </p>
            </div>
            <button onClick={() => setIsOpenDonat(!isOpenDonat)}>Donate</button>
            {isOpenDonat && (
              <DonatsModal
                setIsOpen={setIsOpenDonat}
                currentProject={currentProject}
              />
            )}
            <AiFillStar
              className={
                user &&
                currentProject &&
                user?.savedProjects.includes(currentProject?._id)
                  ? "star_rating_active"
                  : "star_rating_disabled"
              }
              onClick={handleStarRating}
            />
          </div>
          <div className="project_details">
            <div className="details_item">
              <h4>Category</h4>
              <p>{currentProject?.category}</p>
            </div>
            <div className="details_item">
              <h4>Placement period</h4>
              <p>{currentProject?.period?.countDays} Days</p>
            </div>
            <div className="details_item">
              <h4>Subcategory</h4>
              <p>{currentProject?.subcategory}</p>
            </div>
            <div className="details_item">
              <h4>Team </h4>
              <div className="team_wrap">
                {currentProject?.team.map((item, idx) => (
                  <p key={idx}>{item} </p>
                ))}
              </div>
            </div>
          </div>
          <div className="project_request">
            <h4>Request</h4>
            <p>{currentProject?.request}</p>
          </div>
          <div className="project_bonus">
            <h4>Bonus for investors </h4>
            <div className="bonus_wrap">
              {currentProject?.bonus.map((item) => (
                <div className="bonus_item" key={item._id}>
                  <p>{item?.title}</p>
                  <p>{item?.amount ? `${item?.amount} $` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        {currentProject &&
          user &&
          currentProject?.user == user?._id &&
          <ProjectdonatsHistory donatsHistory={currentProject?.donatsHistory}/>
      }
      <div className="coments_block">
        <h4>Comments</h4>
        <button onClick={() => setIsOpenComent(!isOpenComent)}>
          leave a comment
        </button>
        {currentProject && currentProject?.comments.length != 0 && 
        <ProjectComments commentsArr={currentProject?.comments} projectId={currentProject?._id} setReload={setReloadProject}/>}
      </div>
      {isOpenComent && <ModalComent setIsOpen={setIsOpenComent} user={user} projectId={currentProject._id}/>}
    </div>
  );
};

export default ProjectOne;
