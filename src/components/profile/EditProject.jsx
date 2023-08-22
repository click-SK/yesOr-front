import React, { useState, useEffect, useRef } from "react";
import "../../styles/newProject.scss";
import { Link } from "react-router-dom";
import SelectChoseCategory from "../SelectChoseCategory";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import { useSelector } from "react-redux";
import * as validation from "../../validation/validator";
import $api from "../../http/httpUser";
import { BsPersonFillAdd } from 'react-icons/bs';

const EditProject = ({selectedProject,setIsOpen}) => {
    const [images, setImages] = useState([]);
    const [imagesSrc, setImagesSrc] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [subCategoryArray, setSubCategoryArray] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [request, setRequest] = useState("");
    const [placementPeriod, setPlacementPeriod] = useState(0);
    const [targetAmount, setTargetAmount] = useState(0);
    const [userAgreement, setUserAgreement] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [reloadUser, setReloadUser] = useState({});
    const [teamBlocks, setTeamBlocks] = useState([]);
    const [bonusBlocks, setBonusBlocks] = useState([{ title: "", amount: "" }]);
  
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
    const [requestErrorMessage, setRequestErrorMessage] = useState("");
    const [placementPeriodErrorMessage, setPlacementPeriodErrorMessage] =
      useState("");
    const [targetAmountErrorMessage, setTargetAmountErrorMessage] = useState("");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
    const { user } = useSelector((state) => state.authUser.user);
  
    useEffect(() => {
        if (selectedProject) {
            setName(selectedProject.name);
            setDescription(selectedProject.description);
            setRequest(selectedProject.request);
            setPlacementPeriod(selectedProject.period.countDays);
            setTargetAmount(selectedProject.target);
            setBonusBlocks(selectedProject.bonus);
            setTeamBlocks(selectedProject.team)
        }
    }, []);


    useEffect(() => {
      if (images.length > 0) {
        const loadImageSrc = async (image) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(image);
          });
        };
    
        const loadImageSrcs = async () => {
          const loadedSrcs = await Promise.all(images.map((image) => loadImageSrc(image)));
          setImagesSrc(loadedSrcs);
        };
    
        loadImageSrcs();
      }
    }, [images]);
  

  
  
    const inputFileRef = useRef(null);
  
    useEffect(() => {
      if (allCategory.length != 0) {
        handleSetDefaultCategory();
      }
    }, [allCategory, subCategoryArray]);
  
    useEffect(() => {
      axios
        .get(`${BASE_URL}/get-all-category`)
        .then((res) => setAllCategory(res.data));
    }, []);
  
    useEffect(() => {
      setSelectedSubCategory(null);
      setSubCategoryArray([]);
      if (selectedCategory && selectedCategory.subcategory.length != 0) {
        setSubCategoryArray(selectedCategory.subcategory);
      }
    }, [selectedCategory]);
  
    useEffect(() => {
      try {
        if (user) {
          $api.get(`/get-me/${user._id}`).then((res) => setCurrentUser(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }, [user, reloadUser]);
    
  
    const handleSetDefaultCategory = () => {
      if (!selectedCategory) {
        setSelectedCategory(allCategory[0]);
      }
      if (!selectedSubCategory) {
        setSelectedSubCategory(subCategoryArray[0]);
      }
    };
  
    const handleImageChange = (e) => {
      try {
        const files = e.target.files;
        const imagesArray = Array.from(files);
        setImages(imagesArray);
      } catch (error) {
        console.log(error);
      }
    };
  
  
  
    const handleCreateNewProject = () => {
      try {
        // const resoult = validation.validationCreateProject({
        //   targetAmount,
        //   placementPeriod,
        //   request,
        //   description,
        //   name,
        //   category: selectedCategory?.category,
        // });
        
        setIsOpen(state => !state)
        

        // if (resoult.isValid && userAgreement) {
        //   const formData = new FormData();
        //   images.forEach((image, index) => {
        //     console.log("image", image);
        //     formData.append(`projectMedia`, image);
        //   });
        //   formData.append('bonus', JSON.stringify(bonusBlocks));
        //   formData.append("userId", user._id);
        //   formData.append("name", name);
        //   formData.append("description", description);
        //   formData.append("request", request);
        //   // formData.append("team", teamBlocks);
        //   for (const block of teamBlocks) {
        //     formData.append("team", block);
        // }
        //   formData.append("period", JSON.stringify({startDate: '',countDays: placementPeriod}));
        //   formData.append("target", targetAmount);
        //   formData.append("category", selectedCategory?.category);
        //   formData.append(
        //     "subcategory",
        //     selectedSubCategory ? selectedSubCategory.name : ""
        //   );
        //   axios.post(`${BASE_URL}/create-project`, formData)
        //   .then(() => {
        //     setTimeout(() => {
        //       alert('Project added')
        //       window.location.reload();
        //     },500)
        //   })
        // } else {
        //   resoult.reason == "name"
        //     ? setNameErrorMessage(resoult.error)
        //     : setNameErrorMessage("");
        //   resoult.reason == "description"
        //     ? setDescriptionErrorMessage(resoult.error)
        //     : setDescriptionErrorMessage("");
        //   resoult.reason == "request"
        //     ? setRequestErrorMessage(resoult.error)
        //     : setRequestErrorMessage("");
        //   resoult.reason == "placementPeriod"
        //     ? setPlacementPeriodErrorMessage(resoult.error)
        //     : setPlacementPeriodErrorMessage("");
        //   resoult.reason == "targetAmount"
        //     ? setTargetAmountErrorMessage(resoult.error)
        //     : setTargetAmountErrorMessage("");
        //   resoult.reason == "category"
        //     ? setCategoryErrorMessage(resoult.error)
        //     : setCategoryErrorMessage("");
        // }
      } catch (e) {
        console.log(e);
      }
      console.log("disabled");
    };
  
  
    const handleAddTeamBlock = () => {
      setTeamBlocks((prevBlocks) => [...prevBlocks, ""]);
    };
  
    const handleRemoveTeamBlock = (index) => {
      setTeamBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
    };
  
    const handleAddBonusBlock = () => {
      setBonusBlocks((prevBlocks) => [...prevBlocks, { title: "", amount: "" }]);
    };
  
    const handleRemoveBonusBlock = (index) => {
      setBonusBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
    };
  
    //--Validation
  
    const handleName = (e) => {
      setName(e);
      handleValidateName(e);
    }
  
    const handleValidateName = (e) => {
      const resoult = validation.validationCreateProject({name: e});
      console.log('resoult',resoult);
  
      if(resoult?.isValid) {
        setNameErrorMessage('');
      } else {
        resoult?.reason == 'name' ? setNameErrorMessage(resoult?.error) : setNameErrorMessage('');
      }
    }
  
    const handleDescription = (e) => {
      setDescription(e);
      handleValidateDescription(e);
    }
  
    const handleValidateDescription = (e) => {
  
      const resoult = validation.validationCreateProject({description: e});
      console.log('resoult',resoult);
  
      if(resoult?.isValid) {
        setDescriptionErrorMessage('');
      } else {
        resoult?.reason == 'description' ? setDescriptionErrorMessage(resoult?.error) : setDescriptionErrorMessage('');
      }
    }
  
    const handleRequest = (e) => {
      setRequest(e);
      handleValidateRequest(e);
    }
  
    const handleValidateRequest = (e) => {
  
      const resoult = validation.validationCreateProject({request: e});
      console.log('resoult',resoult);
  
      if(resoult?.isValid) {
        setRequestErrorMessage('');
      } else {
        resoult?.reason == 'request' ? setRequestErrorMessage(resoult?.error) : setRequestErrorMessage('');
      }
    }
    const handlePlacementPeriod = (e) => {
      setPlacementPeriod(e);
      handleValidatePlacementPeriod(e);
    }
  
    const handleValidatePlacementPeriod = (e) => {
  
      const resoult = validation.validationCreateProject({placementPeriod: e});
      console.log('resoult',resoult);
  
      if(resoult?.isValid) {
        setPlacementPeriodErrorMessage('');
      } else {
        resoult?.reason == 'placementPeriod' ? setPlacementPeriodErrorMessage(resoult?.error) : setPlacementPeriodErrorMessage('');
      }
    }
    const handleTargetAmount = (e) => {
      setTargetAmount(e);
      handleValidateTargetAmount(e);
    }
  
    const handleValidateTargetAmount = (e) => {
  
      const resoult = validation.validationCreateProject({targetAmount: e});
      console.log('resoult',resoult);
  
      if(resoult?.isValid) {
        setTargetAmountErrorMessage('');
      } else {
        resoult?.reason == 'targetAmount' ? setTargetAmountErrorMessage(resoult?.error) : setTargetAmountErrorMessage('');
      }
    }
  
    console.log('selectedProject', selectedProject);
  
    return (
      <div className="new_project_wraper edit_curent_project">
        
        <div className="profile_title">
          <h4>Edite project - "{selectedProject.name}"</h4>
        </div>
        {/* <div className=''> */}
  
        {/* <div className="new_project_image_wrap">
          {imagesSrc.length != 0 && imagesSrc.map((image,idx) => (
            <div key={idx} className="new_project_image_block">
              <img src={image} className="new_project_image"/>
              <video controls>
        <source src={image} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
            </div>
          ))}
        </div> */}
        <div className="new_project_image_wrap">
    {imagesSrc.length !== 0 && imagesSrc.map((data, idx) => {
      const mimeType = data.startsWith('data:video') ? 'video/mp4' : 'image/jpeg';
      const fileType = mimeType.startsWith('video') ? 'video' : 'image';
  
      return (
        <div key={idx} className="new_project_image_block">
          {fileType === 'image' ? (
            <img src={data} className="new_project_image" alt={`Image ${idx}`} />
          ) : (
            <video controls className="new_project_image">
              <source src={data} type={mimeType} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      );
    })}
  </div>
  
        <div className="input_wrap">
          <input
            type="file"
            name="img"
            onChange={handleImageChange}
            ref={inputFileRef}
            hidden
            multiple
          />
          <button
            onClick={() => inputFileRef.current.click()}
            className={images.length != 0 ? "success" : ""}
          >
            {" "}
            {images.length != 0 ? "Documents uploaded" : "Upload documents"}
          </button>
          <div className="input_item">
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleName(e.target.value)}
            />
          </div>
          {nameErrorMessage && <p className="danger">{nameErrorMessage}</p>}
          <div className="categori_wrap">
            {allCategory.length != 0 && (
              <SelectChoseCategory
                setState={setSelectedCategory}
                state={selectedCategory}
                title="Chose category"
                item={allCategory}
                isCategory={true}
                isSubcategory={false}
              />
            )}
            {subCategoryArray.length != 0 && (
              <SelectChoseCategory
                setState={setSelectedSubCategory}
                state={selectedSubCategory}
                title="Chose sub category"
                item={subCategoryArray}
                isCategory={false}
                isSubcategory={true}
              />
            )}
          </div>
          {categoryErrorMessage && (
            <p className="danger">{categoryErrorMessage}</p>
          )}
          <div className="input_item">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              type="text"
              value={description}
              onChange={(e) => handleDescription(e.target.value)}
            />
          </div>
          {descriptionErrorMessage && (
            <p className="danger">{descriptionErrorMessage}</p>
          )}
          <div className="input_item">
            <label htmlFor="request">Request*</label>
            <textarea
              id="request"
              type="text"
              value={request}
              onChange={(e) => handleRequest(e.target.value)}
            />
          </div>
          {requestErrorMessage && <p className="danger">{requestErrorMessage}</p>}
          <div className="input_item">
            {/* <label htmlFor="dynamicTeam">Owner*</label>
            <input
              id="dynamicTeam"
              type="text"
              value={currentUser?.lastName ? `${currentUser.lastName} ${currentUser.firstName}` : ''}
              onChange={(e) => {
                const updatedBlocks = [...teamBlocks];
                if (updatedBlocks.length === 0) {
                  updatedBlocks.push(""); // Додавання нового блоку при введенні в порожній масив
                }
                updatedBlocks[0] = e.target.value;
                setTeamBlocks(updatedBlocks);
              }}
            /> */}
            <div className="team_dynamic_wrap">
              <label className="team_label" htmlFor="team">Team</label>
              <button className="btn_add_team" onClick={handleAddTeamBlock}><BsPersonFillAdd/></button>
            </div>
            {teamBlocks.map((block, index) => (
      
          <div id="team" key={index} className="team-block">
              <input
                  type="text"
                  value={teamBlocks[index]}
                  onChange={(e) => {
                      setTeamBlocks((prevBlocks) =>
                          prevBlocks.map((b, i) => (i === index ? e.target.value : b))
                      );
                  }}
              />
              <button className="btn_add_team" onClick={() => handleRemoveTeamBlock(index)}>-</button>
          </div>
      
  ))}
          </div>
          <div className="input_item">
            <label htmlFor="placement">Placement period*</label>
            <input
              id="placement"
              type="text"
              value={placementPeriod}
              onChange={(e) => handlePlacementPeriod(e.target.value)}
            />
          </div>
          {placementPeriodErrorMessage && (
            <p className="danger">{placementPeriodErrorMessage}</p>
          )}
          <div className="input_item">
            <label htmlFor="terget">Target amount*</label>
            <input
              id="target"
              type="text"
              value={targetAmount}
              onChange={(e) => handleTargetAmount(e.target.value)}
            />
          </div>
          {targetAmountErrorMessage && (
            <p className="danger">{targetAmountErrorMessage}</p>
          )}
          <div className="input_item">
            <div className="title_bonus">
              <label htmlFor="bonus">Bonus for investors </label>
              <button className="btn_add_team" onClick={handleAddBonusBlock}>+</button>
  
            </div>
            {bonusBlocks.map((block, index) => (
              <div key={index} className="bonus-block">
                <div className="input_bonus_wrap">
                  <input
                    type="text"
                    placeholder="Title"
                    value={block.title}
                    onChange={(e) =>
                      setBonusBlocks((prevBlocks) =>
                        prevBlocks.map((b, i) =>
                          i === index ? { ...b, title: e.target.value } : b
                        )
                      )
                    }
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={block.amount}
                    onChange={(e) =>
                      setBonusBlocks((prevBlocks) =>
                        prevBlocks.map((b, i) =>
                          i === index ? { ...b, amount: e.target.value } : b
                        )
                      )
                    }
                  />
                </div>
                <button className="btn_add_team" onClick={() => handleRemoveBonusBlock(index)}>-</button>
              </div>
            ))}
          </div>
          <div className="input_checkbox_wrap">
            <div className="input_checkbox_wrap-item">
              <input
                className="checkbox_input"
                id="remember_me"
                type="checkbox"
                checked={userAgreement}
                onChange={() => setUserAgreement((state) => !state)}
              />
              <label
                htmlFor="remember_me"
                className={userAgreement ? "" : "danger"}
              >
                Confirm user agreement
              </label>
            </div>
            <Link to="/rules">
              <p>
                Rules <img src="./icons/ph_info-light2.svg" alt="" />
              </p>
            </Link>
          </div>
        </div>
        <button
          disabled={currentUser?.isVerified ? false : true}
          onClick={handleCreateNewProject}
        >
          Save
        </button>
        {/* </div> */}
      </div>
    );
  };
  

export default EditProject;