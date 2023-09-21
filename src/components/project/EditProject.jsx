import React, { useState, useEffect, useRef } from "react";
import "../../styles/newProject.scss";
import { Link } from "react-router-dom";
import SelectChoseCategory from "../SelectChoseCategory";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import { useSelector } from "react-redux";
import * as validation from "../../validation/validator";
import $api from "../../http/httpUser";
import { BsPersonFillAdd } from "react-icons/bs";
import FilterDataPicker from "./filters/FilterDataPicker";

const EditProject = ({ selectedProject, setIsOpen }) => {
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
  const [currentUser, setCurrentUser] = useState({});
  const [reloadUser, setReloadUser] = useState({});
  const [teamBlocks, setTeamBlocks] = useState([]);
  const [bonusBlocks, setBonusBlocks] = useState([{ title: "", amount: "" }]);
  const [selectedDate, setSelectedDate] = useState('');
  const [validateDate, setValidateDate] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [requestErrorMessage, setRequestErrorMessage] = useState("");
  const [placementPeriodErrorMessage, setPlacementPeriodErrorMessage] =
    useState("");
  const [targetAmountErrorMessage, setTargetAmountErrorMessage] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
  const [secondCategoryErrorMessage, setSecondCategoryErrorMessage] = useState('');
  const [secondSubCategoryErrorMessage, setSecondSubCategoryErrorMessage] = useState('');
  const { user } = useSelector((state) => state.authUser.user);

  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject?.name);
      setDescription(selectedProject?.description);
      setRequest(selectedProject?.request);
      setPlacementPeriod(selectedProject?.period?.countDays);
      setTargetAmount(selectedProject?.target);
      setBonusBlocks(selectedProject?.bonus);
      setTeamBlocks(selectedProject?.team);
    }
  }, []);

  useEffect(() => {
    try {
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
          const loadedSrcs = await Promise.all(
            images.map((image) => loadImageSrc(image))
          );
          setImagesSrc(loadedSrcs);
        };

        loadImageSrcs();
      }
    } catch (error) {
      console.log(error);
    }
  }, [images]);

  const inputFileRef = useRef(null);

  useEffect(() => {
    try {
      if (allCategory.length != 0) {
        handleSetDefaultCategory();
      }
    } catch (error) {
      console.log(error);
    }
  }, [allCategory, subCategoryArray]);

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/get-all-category`)
        .then((res) => setAllCategory(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      setSelectedSubCategory(null);
      setSubCategoryArray([]);
      if (selectedCategory && selectedCategory?.subcategory.length != 0) {
        setSubCategoryArray(selectedCategory?.subcategory);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedCategory]);

  useEffect(() => {
    try {
      if (user) {
        $api
          .get(`/get-me/${user?._id}`)
          .then((res) => setCurrentUser(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [user, reloadUser]);

  const handleSetDefaultCategory = () => {
    if (!selectedCategory) {
      allCategory.forEach((category) => {
        if (category.category == selectedProject?.category) {
          setSelectedCategory(category);
        }
      });
    }
    if (!selectedSubCategory) {
      subCategoryArray.forEach((category) => {
        if (category?.name == selectedProject?.subcategory) {
          setSelectedSubCategory(category);
        }
      });
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
      const resoult = validation.validationCreateProject({
        targetAmount,
        placementPeriod,
        request,
        description,
        name,
        category: selectedCategory?.category,
      });

      let isValid = false;
      if(!validateDate) {
        return alert('Chose date')
      }

      if(resoult.length == 0) {
        isValid = true;
      } else {
        resoult.forEach((item) => {
          item.reason == 'name' && setNameErrorMessage(item?.error);
          item.reason == 'description' && setDescriptionErrorMessage(item.error);
          item.reason == 'request' && setRequestErrorMessage(item.error);
          item.reason == 'placementPeriod' && setPlacementPeriodErrorMessage(item.error);
          item.reason == 'targetAmount' && setTargetAmountErrorMessage(item.error);
          selectedCategory?.category == "Miscellaneous" && item.reason == 'secondCategory' && setSecondCategoryErrorMessage(item.error);
          (selectedSubCategory?.name == "Other IT Solutions" || selectedSubCategory?.name == 'Other Inventions') && item.reason == 'secondSubCategory' && setSecondSubCategoryErrorMessage(item.error);
        })
      }

      if (isValid && validateDate) {
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append(`projectMedia`, image);
        });
        formData.append("bonus", JSON.stringify(bonusBlocks));
        formData.append("projectId", selectedProject?._id);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("request", request);
        // formData.append("team", teamBlocks);
        for (const block of teamBlocks) {
          formData.append("team", block);
        }
        formData.append(
          "period",
          JSON.stringify({startDate: '', endDate: selectedDate})
        );
        formData.append("target", targetAmount);
        // formData.append("category", selectedCategory?.category);
        // formData.append(
        //   "subcategory",
        //   selectedSubCategory && selectedSubCategory?.name
        //     ? selectedSubCategory?.name
        //     : subCategoryArray.length !== 0
        //     ? subCategoryArray[0].name
        //     : ""
        // );
        axios.patch(`${BASE_URL}/update-project`, formData).then(() => {
          alert("Project updated");
          setTimeout(() => {
            setIsOpen((state) => !state);
            // window.location.reload();
          }, 500);
        })
        .catch((error) => {
          console.log('Request error',error);
      })
      } else {
        resoult.reason == "name"
          ? setNameErrorMessage(resoult.error)
          : setNameErrorMessage("");
        resoult.reason == "description"
          ? setDescriptionErrorMessage(resoult.error)
          : setDescriptionErrorMessage("");
        resoult.reason == "request"
          ? setRequestErrorMessage(resoult.error)
          : setRequestErrorMessage("");
        resoult.reason == "placementPeriod"
          ? setPlacementPeriodErrorMessage(resoult.error)
          : setPlacementPeriodErrorMessage("");
        resoult.reason == "targetAmount"
          ? setTargetAmountErrorMessage(resoult.error)
          : setTargetAmountErrorMessage("");
        resoult.reason == "category"
          ? setCategoryErrorMessage(resoult.error)
          : setCategoryErrorMessage("");
      }
    } catch (e) {
      console.log(e);
    }
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
  };

  const handleValidateName = (e) => {
    const resoult = validation.validationCreateProject({ name: e });

    if (resoult?.isValid) {
      setNameErrorMessage("");
    } else {
      resoult?.reason == "name"
        ? setNameErrorMessage(resoult?.error)
        : setNameErrorMessage("");
    }
  };

  const handleDescription = (e) => {
    setDescription(e);
    handleValidateDescription(e);
  };

  const handleValidateDescription = (e) => {
    const resoult = validation.validationCreateProject({ description: e });

    if (resoult?.isValid) {
      setDescriptionErrorMessage("");
    } else {
      resoult?.reason == "description"
        ? setDescriptionErrorMessage(resoult?.error)
        : setDescriptionErrorMessage("");
    }
  };

  const handleRequest = (e) => {
    setRequest(e);
    handleValidateRequest(e);
  };

  const handleValidateRequest = (e) => {
    try {
      const resoult = validation.validationCreateProject({ request: e });

      if (resoult?.isValid) {
        setRequestErrorMessage("");
      } else {
        resoult?.reason == "request"
          ? setRequestErrorMessage(resoult?.error)
          : setRequestErrorMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlacementPeriod = (e) => {
    const currentDate = new Date();
  
    if(e < currentDate) {
      setValidateDate(false);
      alert('You cannot select a date that has already passed')
      return
    } else {
      setValidateDate(true);
    }
    setPlacementPeriod(e);
    handleValidatePlacementPeriod(e);
  };

  const handleValidatePlacementPeriod = (e) => {
    try {
      const resoult = validation.validationCreateProject({
        placementPeriod: e,
      });

      if (resoult?.isValid) {
        setPlacementPeriodErrorMessage("");
      } else {
        resoult?.reason == "placementPeriod"
          ? setPlacementPeriodErrorMessage(resoult?.error)
          : setPlacementPeriodErrorMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTargetAmount = (e) => {
    setTargetAmount(e);
    handleValidateTargetAmount(e);
  };

  const handleValidateTargetAmount = (e) => {
    try {
      const resoult = validation.validationCreateProject({ targetAmount: e });

      if (resoult?.isValid) {
        setTargetAmountErrorMessage("");
      } else {
        resoult?.reason == "targetAmount"
          ? setTargetAmountErrorMessage(resoult?.error)
          : setTargetAmountErrorMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new_project_wraper edit_curent_project">
      <div className="profile_title">
        <h4>Edite project - "{selectedProject.name}"</h4>
      </div>
      <div className="new_project_image_wrap">
        {imagesSrc.length !== 0 &&
          imagesSrc.map((data, idx) => {
            const mimeType = data.startsWith("data:video")
              ? "video/mp4"
              : "image/jpeg";
            const fileType = mimeType.startsWith("video") ? "video" : "image";

            return (
              <div key={idx} className="new_project_image_block">
                {fileType === "image" ? (
                  <img
                    src={data}
                    className="new_project_image"
                    alt={`Image ${idx}`}
                  />
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
        <button onClick={() => setIsOpen((state) =>!state)}>Back</button>
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
        {/* <div className="categori_wrap">
          {allCategory.length != 0 && (
            <SelectChoseCategory
              setState={setSelectedCategory}
              state={selectedCategory}
              title="Chose category"
              item={allCategory}
              isCategory={true}
              isSubcategory={false}
              editCategory={selectedProject.category}
              isEdit={true}
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
              editCategory={selectedProject.subcategory}
              isEdit={true}
            />
          )}
        </div> */}
        {/* {categoryErrorMessage && (
          <p className="danger">{categoryErrorMessage}</p>
        )} */}
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
            <label className="team_label" htmlFor="team">
              Team
            </label>
            <button className="btn_add_team" onClick={handleAddTeamBlock}>
              <BsPersonFillAdd />
            </button>
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
              <button
                className="btn_add_team"
                onClick={() => handleRemoveTeamBlock(index)}
              >
                -
              </button>
            </div>
          ))}
        </div>
        <div className="input_item">
          <label htmlFor="placement">Placement period*</label>
          {/* <input
            id="placement"
            type="text"
            value={placementPeriod}
            onChange={(e) => handlePlacementPeriod(e.target.value)}
          /> */}
          <FilterDataPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} handlePlacementPeriod={handlePlacementPeriod}/>
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
            <button className="btn_add_team" onClick={handleAddBonusBlock}>
              +
            </button>
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
              <button
                className="btn_add_team"
                onClick={() => handleRemoveBonusBlock(index)}
              >
                -
              </button>
            </div>
          ))}
        </div>
        <div className="input_checkbox_wrap">
          <Link to="/rules">
            <p>
              Rules <img src="./icons/ph_info-light2.svg" alt="" />
            </p>
          </Link>
        </div>
      </div>
      <button
        disabled={currentUser?.isVerified ? false : true}
        onClick={() => handleCreateNewProject()}
      >
        Update
      </button>
    </div>
  );
};

export default EditProject;
