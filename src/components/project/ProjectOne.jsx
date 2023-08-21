import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../http/baseUrl';
import axios from "axios";
import { Link } from 'react-router-dom'; 
import {AiFillStar} from 'react-icons/ai';
import '../../styles/projectPage.scss'
import moment from 'moment';
import DonatsModal from './donatsComp/DonatsModal';
import HistoryDonats from './historiDonats/HistoryDonats';

const ProjectOne = () => {
    const [currentProject, setCurrentProject] = useState(null);
    const [projectId, setProjectId] = useState('');
    const [isOpenDonat, setIsOpenDonat] = useState(false)
    const [donatsValue, setDonatsValue] = useState(0);
    const [fullName, setFullName] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const [deysLeft, setDaysLeft] = useState (null)
    const [hourLeft, setHourLeft] = useState (null)
    const [minutsLeft, setMinutsLeft] = useState (null)
    const [secondLeft, setSecondLeft] = useState (null)
    const [percentCollected, setPercentCollected] = useState(0);
    // const [currentImg, setCurrentImg] = useState('/file/proj/1.png')
    // const [imgProject, setImgProject] = useState([
    //     '/file/proj/1.png',
    //     '/file/proj/2.png',
    //     '/file/proj/3.png',
    //     '/file/proj/4.png',
    //     '/file/proj/5.png',
    // ])
    const [currentImg, setCurrentImg] = useState();
    const [imgProject, setImgProject] = useState([]);

    const {user} = useSelector((state) => state.authUser.user);

    useEffect(() => {
        const url = window.location.href;
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 1];
        setProjectId(id);
    },[])

    console.log('timeLeft',timeLeft);

    useEffect(() => {
        if(projectId) {
            axios.get(`${BASE_URL}/get-one-project/${projectId}`)
            .then((res) => {
                setCurrentProject(res.data);
                setImgProject(res.data.projectMedia)
                setCurrentImg(res.data.projectMedia[0])
            })
        }
    },[projectId])

    console.log('currentProject 1',currentProject );

    

    useEffect(() => {
        if (currentProject) {
            const collected = currentProject.amountCollected;
            const target = currentProject.target;
            const percent = (collected / target) * 100;
            setPercentCollected(percent);
        }
    }, [currentProject]);

    useEffect(() => {
        if(currentProject) {
            function calculateTimeDifference(startDate, days) {
                const currentDate = moment().utcOffset(3);
                const futureDate = moment(startDate).add(days, 'days');
              
                const timeDifference = futureDate.diff(currentDate);
              
                const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
              
                return {
                  days: remainingDays,
                  hours: remainingHours,
                  minutes: remainingMinutes
                };
              }

              console.log('date',moment().utcOffset(3)._d)
              
              // Приклад використання
              const startDate = currentProject?.period?.startDate;
              console.log('startDate',!!startDate);
              const daysToAdd = currentProject?.period?.countDays;
              
              const remainingTime = calculateTimeDifference(startDate, daysToAdd);
              console.log('remainingTime',remainingTime.days);
              if(!!startDate) {
                setTimeLeft(`${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes`)
              } else {
                setTimeLeft('0')
              }
        }
    },[currentProject])

    const handleSavedProject = () => {
        axios.patch(`${BASE_URL}/saved-project`, {
            userId: user._id,
            projectId: currentProject._id
        }).then(() => window.location.reload())
    }
    const handleRemoveSavedProject = () => {
        axios.patch(`${BASE_URL}/remove-saved-project`, {
            userId: user._id,
            projectId: currentProject._id
        }).then(() => window.location.reload())
    }

    const handleStarRating = () => {
        if(user && currentProject && user.savedProjects.includes(currentProject._id)) {
            handleRemoveSavedProject();
        } else {
            handleSavedProject();
        }
    }

    const handleSendDonats = () => {
        axios.patch(`${BASE_URL}/donats-project`, {
            projectId: currentProject._id,
            sum: donatsValue,
            user: fullName,
            comment: 'Test',
            userId: user._id
        }).then(() => {
            alert('succeed donates')
            window.location.reload();
            setFullName('');
            setDonatsValue(0);
        })
    }



    
    useEffect(() => {
        if (currentProject && currentProject.period && currentProject.period.startDate && currentProject.period.countDays) {
            const endDate = new Date(currentProject.period.startDate);
            endDate.setDate(endDate.getDate() + currentProject.period.countDays);
    
            const timerInterval = setInterval(() => {
                const currentDate = new Date();
                const timeDifference = endDate - currentDate;
    
                if (timeDifference > 0) {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
                    const formattedDays = days.toString().padStart(2, '0');
                    const formattedHours = hours.toString().padStart(2, '0');
                    const formattedMinutes = minutes.toString().padStart(2, '0');
                    const formattedSeconds = seconds.toString().padStart(2, '0');
    
                    setTimeLeft(`${formattedDays} : ${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`);
                    setDaysLeft(formattedDays);
                    setHourLeft(formattedHours);
                    setMinutsLeft(formattedMinutes);
                    setSecondLeft(formattedSeconds);
                } else {
                    clearInterval(timerInterval);
                    setTimeLeft('Time Expired');
                }
            }, 1000);
    
            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [currentProject]);


    console.log('currentProject', deysLeft);
    console.log('imgProject', imgProject);

    return (
      <div className="project_wraper">
        <div className="btn_back">
          <Link to="/discover">
            <button>Back</button>
          </Link>
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
              <p style={{ width: `${percentCollected}%`, textAlign: "right" }}>
                {percentCollected}%
              </p>
            </div>
            <div className="project_description_wrap">
              <img className="main_img" src={`${BASE_URL}${currentImg}`} alt="" />
              <div className="second_img_wrap">
                {/* {imgProject?.length != 0 && imgProject.map((item,idx) => (
                                    <img key={idx} src={`${BASE_URL}${item}`} onClick={() => setCurrentImg(item)} alt="" />
                                ))} */}
                {imgProject.length !== 0 &&
                  imgProject.map((data, idx) => {
                    const extension = data.split(".").pop(); // Отримуємо розширення файлу

                    console.log('extension',extension);


                    return (
                      <div key={idx} className="new_project_image_block">
                        {extension == 'jpg' &&
                         <img key={idx} src={`${BASE_URL}${data}`} onClick={() => setCurrentImg(data)} alt="" />}
                        {extension == 'mp4' &&
                         <video key={idx} src={`${BASE_URL}${data}`} onClick={() => setCurrentImg(data)} alt="" />}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="project_description">
              <h4>Description</h4>
              <p>{currentProject?.description}</p>
            </div>
            <div className="project_description">
              <h4>Target amount</h4>
              <p>{currentProject?.target}</p>
              <h4>Colected amount</h4>
              <p>{currentProject?.amountCollected}</p>
            </div>
          </div>
          <div className="right_column">
            <div className="timer_wraper">
              <div className="timer_item">
                <p className="item_number">{deysLeft} :</p>
                <p className="item_text">Days</p>
              </div>
              <div className="timer_item">
                <p className="item_number">{hourLeft} :</p>
                <p className="item_text">Hours</p>
              </div>
              <div className="timer_item">
                <p className="item_number">{minutsLeft} :</p>
                <p className="item_text">Minutes</p>
              </div>
              <div className="timer_item">
                <p className="item_number">{secondLeft} </p>
                <p className="item_text">Second</p>
              </div>
            </div>
            <div className="project_name_wrap">
              <img src="" alt="" />
              <div>
                <h4>Name</h4>
                <p>{currentProject?.name} </p>
              </div>
              <AiFillStar
                className={
                  user &&
                  currentProject &&
                  user.savedProjects.includes(currentProject._id)
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
                {/* <h4>Time left</h4>
                            <p>{timeLeft && timeLeft} </p> */}
              </div>
              <div className="details_item">
                <h4>Subcategory</h4>
                <p>{currentProject?.subcategory}</p>
              </div>
              <div className="details_item">
                <h4>Team </h4>
                <div>
                  {currentProject?.team.map((item, idx) => (
                    <p key={idx}>{item}</p>
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
              <div>
                {currentProject?.bonus.map((item) => (
                  <div key={item._id}>
                    <p>{item.title}</p>
                    <p>{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {currentProject &&
          user &&
          currentProject.user == user._id &&
          currentProject?.donatsHistory.map((item) => (
            <div key={item._id}>
              <p>Name: {item.user}</p>
              <p>Sum: {item.sum}</p>
              <p>Comment: {item.text}</p>
              <p>Date: {item.date}</p>
            </div>
          ))}
        <button onClick={() => setIsOpenDonat(!isOpenDonat)}>Open modal</button>
        {isOpenDonat && (
          <DonatsModal
            setIsOpen={setIsOpenDonat}
            currentProject={currentProject}
          />
        )}
      </div>
    );
};

export default ProjectOne;