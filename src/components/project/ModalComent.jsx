import React, { useState, useEffect, useRef } from "react";
import "../../styles/modalWindow.scss";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
import ErrorMessage from "../validation/ErrorMessage";
import * as validator from '../../validation/validator';
const ModalComent = ({setIsOpen, user, projectId}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

  useEffect(() => {
    if(user) {
      setName(user.firstName);
      setEmail(user.email);
    }
  },[])

  const handleSendComment = () => {
    const resoult = validator.validationComment({
      name,
      description
    });
    let isValid = false;

    if(resoult.length == 0) {
      isValid = true;
    } else {
      resoult.forEach((item) => {
        item.reason == 'name' && setNameErrorMessage(item?.error);
        item.reason == 'description' && setDescriptionErrorMessage(item.error);
      })
    }

    if(isValid) {
      if(user) {
        axios.patch(`${BASE_URL}/add-project-comment`, {
          userId: user._id,
          comment: description,
          projectId
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          },500)
        }).catch((error) => {
          console.log('Request error',error);
      })
      } else {
        axios.patch(`${BASE_URL}/add-project-comment`, {
          name,
          email,
          comment: description,
          projectId
        }).then(() => {
          setTimeout(() => {
            alert('Comments added')
            window.location.reload();
          },500)
        }).catch((error) => {
          console.log('Request error',error);
      })
      }
    }
  }

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
        const resoult = validator.validationComment({name: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'name' ? setNameErrorMessage(item.error) : setNameErrorMessage('');
          })
        } else {
          setNameErrorMessage('');
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
        const resoult = validator.validationComment({description: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'description' ? setDescriptionErrorMessage(item.error) : setDescriptionErrorMessage('');
          })
        } else {
          setDescriptionErrorMessage('');
        }
      }
  return (
    <div className="modal_wrap">
      <div className="item_body pad">
        {/* <div style={{ marginTop: "50px" }}>
          <button onClick={() => setIsOpen((state) => !state)}>X</button>
        </div> */}
        <h2>Write your comment</h2>
        <div className="content_modal">
            <div className="two_input_wrap">
            <div className="input_item">
                <label htmlFor="name">Name*</label>
                <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleName(e.target.value)}
                />
                <ErrorMessage errorMessage={nameErrorMessage}/>
            </div>
            <div className="input_item">
                <label htmlFor="name">Email</label>
                <input
                id="name"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            </div>
          <div className="input_item">
            <label htmlFor="description">Comment*</label>
            <textarea
              id="description"
              type="text"
              value={description}
              onChange={(e) => handleDescription(e.target.value)}
            />
              <ErrorMessage errorMessage={descriptionErrorMessage}/>
          </div>
        </div>
        <div style={{display:'flex', gap:'30px'}}>
                <button onClick={() => setIsOpen(state => !state)}>Discard</button>

                <button onClick={handleSendComment}>Save</button>
                </div>
      </div>
    </div>
  );
};

export default ModalComent;
