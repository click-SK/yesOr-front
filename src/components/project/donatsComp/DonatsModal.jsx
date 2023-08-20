import React, { useState, useEffect, useRef } from "react";
import '../../../styles/modalWindow.scss'

const DonatsModal = () => {
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");
    const [amount, setAmount] = useState(null);
    const [card, setCard] = useState(null);
    const [validity, setValidity] = useState(null);
    const [cvv, setCvv] = useState(null);
    const [description, setDescription] = useState("");
    return (
        <div className='modal_wrap'>
            <div className='item_body pad'>
                <h2>Please donate</h2>
                <div className='content_modal'>
                <div className="input_item">
                    <label htmlFor="name">First Name*</label>
                    <input
                        id="name"
                        type="text"
                        value={nameFirst}
                        onChange={(e) => setNameFirst(e.target.value)}
                    /> 
                </div>
                <div className="input_item">
                    <label htmlFor="name">Last Name*</label>
                    <input
                        id="name"
                        type="text"
                        value={nameLast}
                        onChange={(e) => setNameLast(e.target.value)}
                    /> 
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
            <div className="input_item">
                    <label htmlFor="amount">Donation amount*</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    /> 
                </div>
                <div className="input_item">
                    <label htmlFor="amount">Number card*</label>
                    <input
                        id="amount"
                        type="number"
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                    /> 
                </div>
                <div className="two_input_wrap">
                <div className="input_item">
                    <label htmlFor="amount">Validity *</label>
                    <input
                        id="amount"
                        type="number"
                        value={validity}
                        onChange={(e) => setValidity(e.target.value)}
                    /> 
                </div>
                <div className="input_item">
                    <label htmlFor="amount">CVV *</label>
                    <input
                        id="amount"
                        type="number"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    /> 
                </div>
                </div>
                </div>
                <button>Confirm</button>
            </div>
        </div>
    );
};

export default DonatsModal;