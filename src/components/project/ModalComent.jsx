import React, { useState, useEffect, useRef } from "react";
import "../../styles/modalWindow.scss";
import axios from "axios";
import { BASE_URL } from "../../http/baseUrl";
const ModalComent = ({setIsOpen, user, projectId}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  console.log('user',user);

  useEffect(() => {
    if(user) {
      setName(user.firstName);
      setEmail(user.email);
    }
  },[])

  const handleSendComment = () => {
    if(user) {
      axios.patch(`${BASE_URL}/add-project-comment`, {
        userId: user._id,
        comment: description,
        projectId
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        },500)
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
      })
    }
  }
  return (
    <div className="modal_wrap">
      <div className="item_body pad">
        <div style={{ marginTop: "50px" }}>
          <button onClick={() => setIsOpen((state) => !state)}>X</button>
        </div>
        <h2>Please donate</h2>
        <div className="content_modal">
            <div className="two_input_wrap">
            <div className="input_item">
                <label htmlFor="name">Name*</label>
                <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
          <button onClick={handleSendComment}>Save</button>
      </div>
    </div>
  );
};

export default ModalComent;
