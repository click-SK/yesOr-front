import React, {useState, useEffect, useRef} from 'react';
import '../../styles/newProject.scss'
import { Link } from 'react-router-dom';
import SelectChoseCategory from '../SelectChoseCategory';
import axios from 'axios';
import { BASE_URL } from '../../http/baseUrl';
import { useSelector } from 'react-redux';
import { validationCreateProject } from '../../validation/validator';
import $api from '../../http/httpUser';

const NewProject = () => {
    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [subCategoryArray, setSubCategoryArray] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [request, setRequest] = useState('');
    const [team, setTeam] = useState('');
    const [placementPeriod, setPlacementPeriod] = useState(0);
    const [targetAmount, setTargetAmount] = useState(0);
    const [bonus, setBonus] = useState('');
    const [userAgreement, setUserAgreement] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [reloadUser, setReloadUser] = useState({});
    const [teamBlocks, setTeamBlocks] = useState([]);
    const [bonusBlocks, setBonusBlocks] = useState([{ title: '', amount: '' }]);

    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');
    const [requestErrorMessage, setRequestErrorMessage] = useState('');
    const [teamErrorMessage, setTeamErrorMessage] = useState('');
    const [placementPeriodErrorMessage, setPlacementPeriodErrorMessage] = useState('');
    const [targetAmountErrorMessage, setTargetAmountErrorMessage] = useState('');
    const [bonusErrorMessage, setBonusErrorMessage] = useState('');
    const [categoryErrorMessage, setCategoryErrorMessage] = useState('');
    const {user} = useSelector((state) => state.authUser.user);

    const inputFileRef = useRef(null);

    useEffect(() => {
        if(allCategory.length != 0) {
            handleSetDefaultCategory();
        }
    },[allCategory, subCategoryArray]);

    useEffect(() => {
        axios.get(`${BASE_URL}/get-all-category`)
        .then((res) => setAllCategory(res.data))
    },[])

    useEffect(() => {
      setSelectedSubCategory(null);
      setSubCategoryArray([]);
        if(selectedCategory && selectedCategory.subcategory.length != 0) {
            setSubCategoryArray(selectedCategory.subcategory)
        }
    },[selectedCategory])

    useEffect(() => {
      try {
          if(user) {
          $api.get(`/get-me/${user._id}`).then((res) => setCurrentUser(res.data));
          }
      } catch(error) {
          console.log(error);
      }
    }, [user, reloadUser]);
    console.log('currentUser',currentUser?.isVerified);

    const handleSetDefaultCategory = () => {
      if(!selectedCategory) {
          setSelectedCategory(allCategory[0]);
      }
      if(!selectedSubCategory) {
          setSelectedSubCategory(subCategoryArray[0]);
      }
  }

    const handleImageChange = (e) => {
      try {
          const files = e.target.files;
          const imagesArray = Array.from(files);
          setImages(imagesArray);
      } catch(error) {
          console.log(error);
      }
    };

    const handleCreateNewProject = () => {
        try {
            const resoult = validationCreateProject({bonus, targetAmount, placementPeriod, team, request, description, name, category: selectedCategory?.category})
            if(resoult.isValid && userAgreement) {
              const formData = new FormData();
              images.forEach((image, index) => {
                console.log('image',image);
                formData.append(`projectMedia`, image);
              });
              formData.append('userId',user._id);
              formData.append('name',name);
              formData.append('description',description);
              formData.append('request',request);
              formData.append('team',team);
              formData.append('period',placementPeriod);
              formData.append('target',targetAmount);
              formData.append('bonus',bonus);
              formData.append('category',selectedCategory?.category);
              formData.append('subcategory',selectedSubCategory ? selectedSubCategory.name : '');
                axios.post(`${BASE_URL}/create-project`, formData)
            } else {
                resoult.reason == 'name' ? setNameErrorMessage(resoult.error) : setNameErrorMessage('');
                resoult.reason == 'description' ? setDescriptionErrorMessage(resoult.error) : setDescriptionErrorMessage('');
                resoult.reason == 'request' ? setRequestErrorMessage(resoult.error) : setRequestErrorMessage('');
                resoult.reason == 'team' ? setTeamErrorMessage(resoult.error) : setTeamErrorMessage('');
                resoult.reason == 'bonus' ? setBonusErrorMessage(resoult.error) : setBonusErrorMessage('');
                resoult.reason == 'placementPeriod' ? setPlacementPeriodErrorMessage(resoult.error) : setPlacementPeriodErrorMessage('');
                resoult.reason == 'targetAmount' ? setTargetAmountErrorMessage(resoult.error) : setTargetAmountErrorMessage('');
                resoult.reason == 'category' ? setCategoryErrorMessage(resoult.error) : setCategoryErrorMessage('');
            }
        } catch(e) {
            console.log(e);
        }
        console.log('disabled');
    }

    const handleAddTeamBlock = () => {
      setTeamBlocks((prevBlocks) => [...prevBlocks, '']);
    };
  
    const handleRemoveTeamBlock = (index) => {
      setTeamBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
    };
  
    const handleAddBonusBlock = () => {
      setBonusBlocks((prevBlocks) => [...prevBlocks, { title: '', amount: '' }]);
    };
  
    const handleRemoveBonusBlock = (index) => {
      setBonusBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
    };

    console.log('team', teamBlocks);

    return (
      <div className="new_project_wraper">
        {!currentUser?.isVerified &&
          <h6 className='warn_werificate'>Only verified users can publish projects!</h6>
        }
        <div className="profile_title">
          <h2>Apply</h2>
        </div>
        {/* <div className=''> */}

        <div className="input_wrap">
        <input
              type="file"
              name="img"
              onChange={handleImageChange}
              ref={inputFileRef}
              hidden
              multiple/>
              <button onClick={() => inputFileRef.current.click()} className={images.length != 0 ? 'success' : ''}> {images.length != 0 ? 'Documents uploaded' : 'Upload documents'}</button>
          <div className="input_item">
            <label htmlFor="name">Name*</label>
            <input id="name" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} />
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
          {categoryErrorMessage && <p className="danger">{categoryErrorMessage}</p>}
          <div className="input_item">
            <label htmlFor="description">Description*</label>
            <textarea id="description" 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          </div>
          {descriptionErrorMessage && <p className="danger">{descriptionErrorMessage}</p>}
          <div className="input_item">
            <label htmlFor="request">Request*</label>
            <textarea id="request" 
            type="text"
            value={request}
            onChange={(e) => setRequest(e.target.value)} />
          </div>
          {requestErrorMessage && <p className="danger">{requestErrorMessage}</p>}
          <div className="input_item">
  <label htmlFor="dynamicTeam">Team*</label>
  <input
    id="dynamicTeam"
    type="text"
    value={teamBlocks.length > 0 ? teamBlocks[0] : ''}
    onChange={(e) => {
      const updatedBlocks = [...teamBlocks];
      if (updatedBlocks.length === 0) {
        updatedBlocks.push(''); // Додавання нового блоку при введенні в порожній масив
      }
      updatedBlocks[0] = e.target.value;
      setTeamBlocks(updatedBlocks);
    }}
  />

  <button onClick={handleAddTeamBlock}>+</button>
  {teamBlocks.map((block, index) => (
    <div key={index} className="team-block">
      <input
        type="text"
        value={teamBlocks[index]}
        onChange={(e) => {
          setTeamBlocks((prevBlocks) =>
            prevBlocks.map((b, i) => (i === index ? e.target.value : b))
          );
        }}
      />
      <button onClick={() => handleRemoveTeamBlock(index)}>-</button>
    </div>
  ))}
</div>
          {teamErrorMessage && <p className="danger">{teamErrorMessage}</p>}
          <div className="input_item">
            <label htmlFor="placement">Placement period*</label>
            <input id="placement" 
            type="text"
            value={placementPeriod}
            onChange={(e) => setPlacementPeriod(e.target.value)} />
          </div>
          {placementPeriodErrorMessage && <p className="danger">{placementPeriodErrorMessage}</p>}
          <div className="input_item">
            <label htmlFor="terget">Target amount*</label>
            <input id="target" 
            type="text"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)} />
          </div>
          {targetAmountErrorMessage && <p className="danger">{targetAmountErrorMessage}</p>}
          <div className="input_item">
        <label htmlFor="bonus">Bonus for investors *</label>
        <button onClick={handleAddBonusBlock}>+</button>
        {bonusBlocks.map((block, index) => (
          <div key={index} className="bonus-block">
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
            <button onClick={() => handleRemoveBonusBlock(index)}>-</button>
          </div>
        ))}
      </div>
          {bonusErrorMessage && <p className="danger">{bonusErrorMessage}</p>}
          <div className="input_checkbox_wrap">
            <div className="input_checkbox_wrap-item">
              <input
                className="checkbox_input"
                id="remember_me"
                type="checkbox"
                checked={userAgreement}
                onChange={() => setUserAgreement((state) => !state)}
              />
              <label htmlFor="remember_me" className={userAgreement ? '' : 'danger'}>Confirm user agreement</label>
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
          Save</button>
        {/* </div> */}
      </div>
    );
};

export default NewProject;