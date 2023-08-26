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
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../validation/ErrorMessage";
const NewProject = () => {
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

  const navigate = useNavigate();

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
    try {
      if (allCategory.length != 0) {
        handleSetDefaultCategory();
      }
    } catch(error) {
        console.log(error);
    }
  }, [allCategory, subCategoryArray]);

  useEffect(() => {
    try {
        axios
          .get(`${BASE_URL}/get-all-category`)
          .then((res) => setAllCategory(res.data));
      } catch(error) {
          console.log(error);
      }
  }, []);

  useEffect(() => {
    try {
      setSelectedSubCategory(null);
      setSubCategoryArray([]);
      if (selectedCategory && selectedCategory.subcategory.length != 0) {
        setSubCategoryArray(selectedCategory.subcategory);
      }
    } catch(error) {
        console.log(error);
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
    try {
      if (!selectedCategory) {
        setSelectedCategory(allCategory[0]);
      }
      if (!selectedSubCategory) {
        setSelectedSubCategory(subCategoryArray[0]);
      }
    } catch(error) {
        console.log(error);
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

      if(resoult.length == 0) {
        isValid = true;
      } else {
        resoult.forEach((item) => {
          item.reason == 'name' && setNameErrorMessage(item?.error);
          item.reason == 'description' && setDescriptionErrorMessage(item.error);
          item.reason == 'request' && setRequestErrorMessage(item.error);
          item.reason == 'placementPeriod' && setPlacementPeriodErrorMessage(item.error);
          item.reason == 'targetAmount' && setTargetAmountErrorMessage(item.error);
        })
      }

      if (isValid && userAgreement) {
        const formData = new FormData();
        images.forEach((image, index) => {
          console.log("image", image);
          formData.append(`projectMedia`, image);
        });
        formData.append('bonus', JSON.stringify(bonusBlocks));
        formData.append("userId", user._id);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("request", request);
        // formData.append("team", teamBlocks);
        for (const block of teamBlocks) {
          formData.append("team", block);
      }
        formData.append("period", JSON.stringify({startDate: '',countDays: placementPeriod}));
        formData.append("target", targetAmount);
        formData.append("category", selectedCategory?.category);
        formData.append(
          "subcategory",
          selectedSubCategory ? selectedSubCategory.name : ""
        );
        axios.post(`${BASE_URL}/create-project`, formData)
        .then(() => {
          setTimeout(() => {
            alert('Project added');
            window.scrollTo(0, 0);
            navigate('/');
          },500)
        })
      } 
    } catch (e) {
      console.log(e);
    }
    console.log("disabled");
  };

  console.log('teamBlocks',teamBlocks);

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
    if(e != '') {
      handleValidateName(e);
    } else {
      setNameErrorMessage('');
    }
  }

  const handleValidateName = (e) => {
    try {
      const resoult = validation.validationCreateProject({name: e});
      if(resoult.length !== 0) {
        resoult.forEach((item) => {
          item.reason == 'name' ? setNameErrorMessage(item.error) : setNameErrorMessage('');
        })
      } else {
        setNameErrorMessage('');
      }
    } catch(error) {
        console.log(error);
    }
  }

  const handleDescription = (e) => {
    setDescription(e);
    if(e != '') {
      handleValidateDescription(e);
    } else {
      setDescriptionErrorMessage('');
    }
  }

  const handleValidateDescription = (e) => {
    try {
      const resoult = validation.validationCreateProject({description: e});
      if(resoult.length !== 0) {
        resoult.forEach((item) => {
          item.reason == 'description' ? setDescriptionErrorMessage(item.error) : setDescriptionErrorMessage('');
        })
      } else {
        setDescriptionErrorMessage('');
      }
    } catch(error) {
        console.log(error);
    }
  }

  const handleRequest = (e) => {
    setRequest(e);
    if(e != '') {
      handleValidateRequest(e);
    } else {
      setRequestErrorMessage('');
    }
  }

  const handleValidateRequest = (e) => {
    try {
      const resoult = validation.validationCreateProject({request: e});
      if(resoult.length !== 0) {
        resoult.forEach((item) => {
          item.reason == 'request' ? setRequestErrorMessage(item.error) : setRequestErrorMessage('');
        })
      } else {
        setRequestErrorMessage('');
      }
    } catch(error) {
        console.log(error);
    }
  }
  const handlePlacementPeriod = (e) => {
    setPlacementPeriod(e);
    if(e != '') {
      handleValidatePlacementPeriod(e);
    } else {
      setPlacementPeriodErrorMessage('');
    }
  }

  const handleValidatePlacementPeriod = (e) => {
    try {
      const resoult = validation.validationCreateProject({placementPeriod: e});
      if(resoult.length !== 0) {
        resoult.forEach((item) => {
          item.reason == 'placementPeriod' ? setPlacementPeriodErrorMessage(item.error) : setPlacementPeriodErrorMessage('');
        })
      } else {
        setPlacementPeriodErrorMessage('');
      }
    } catch(error) {
        console.log(error);
    }
  }
  const handleTargetAmount = (e) => {
    setTargetAmount(e);
    if(e != '') {
      handleValidateTargetAmount(e);
    } else {
      setTargetAmountErrorMessage('');
    }
  }

  const handleValidateTargetAmount = (e) => {
    try {
      const resoult = validation.validationCreateProject({targetAmount: e});
      if(resoult.length !== 0) {
        resoult.forEach((item) => {
          item.reason == 'targetAmount' ? setTargetAmountErrorMessage(item.error) : setTargetAmountErrorMessage('');
        })
      } else {
        setTargetAmountErrorMessage('');
      }
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <div className="new_project_wraper">
      {!currentUser?.isVerified && (
        <h6 className="warn_werificate">
          Only verified users can publish projects!
        </h6>
      )}
      <div className="profile_title">
        <h2>Apply</h2>
      </div>
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
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => handleName(e.target.value)}
          />
        </div>
        <ErrorMessage errorMessage={nameErrorMessage}/>
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
        <ErrorMessage errorMessage={categoryErrorMessage}/>
        <div className="input_item">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => handleDescription(e.target.value)}
          />
        </div>
        <ErrorMessage errorMessage={descriptionErrorMessage}/>
        <div className="input_item">
          <label htmlFor="request">Request *</label>
          <textarea
            id="request"
            type="text"
            value={request}
            onChange={(e) => handleRequest(e.target.value)}
          />
        </div>
        <ErrorMessage errorMessage={requestErrorMessage}/>
        <div className="input_item">
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
          <label htmlFor="placement">Placement period *</label>
          <input
            id="placement"
            type="text"
            value={placementPeriod}
            onChange={(e) => handlePlacementPeriod(e.target.value)}
          />
        </div>
        <ErrorMessage errorMessage={placementPeriodErrorMessage}/>
        <div className="input_item">
          <label htmlFor="terget">Target amount *</label>
          <input
            id="target"
            type="text"
            value={targetAmount}
            onChange={(e) => handleTargetAmount(e.target.value)}
          />
        </div>
        <ErrorMessage errorMessage={targetAmountErrorMessage}/>
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

export default NewProject;
