import React, { useState, useEffect, useRef } from "react";
import "../../styles/modalWindow.scss";
// import axios from "axios";
// import { BASE_URL } from "../../../http/baseUrl";
// import { useSelector } from "react-redux";
// import * as validator from "../../../validation/validator";

const ModalComent = ({setIsOpen}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
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
          <button>Save</button>
      </div>
    </div>
  );
};

export default ModalComent;
