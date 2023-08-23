import React, { useState, useEffect, useRef } from "react";
import '../../../styles/modalWindow.scss'
import axios from "axios";
import { BASE_URL } from '../../../http/baseUrl';
import { useSelector } from 'react-redux';
import * as validator from '../../../validation/validator';
const DonatsModal = ({setIsOpen, currentProject}) => {
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");
    const [amount, setAmount] = useState('');
    const [card, setCard] = useState('');
    const [validity, setValidity] = useState('');
    const [cvv, setCvv] = useState('');
    const [description, setDescription] = useState("");
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [amountErrorMessage, setAmountErrorMessage] = useState('');
    const [numberCardErrorMessage, setNumberCardErrorMessage] = useState('');
    const [numberCardDateErrorMessage, setNumberCardDateErrorMessage] = useState('');
    const [numberCardCVVErrorMessage, setNumberCardCVVErrorMessage] = useState('');

    const {user} = useSelector((state) => state.authUser.user);
    console.log('cvv',cvv);

    const handleSendDonats = () => {
        const resoult = validator.validationDonate({
            nameFirst,
            nameLast,
            amount,
            card,
            validity,
            cvv,
          });
          if(resoult.isValid) {
            axios.patch(`${BASE_URL}/donats-project`, {
                projectId: currentProject?._id,
                sum: amount,
                user: `${nameFirst} ${nameLast}`,
                comment: description,
                userId: user._id
            }).then(() => {
                alert('succeed donates')
                window.location.reload();
            })
          } else {
            resoult.reason == "nameFirst"
              ? setFirstNameErrorMessage(resoult.error)
              : setFirstNameErrorMessage("");
            resoult.reason == "nameLast"
              ? setLastNameErrorMessage(resoult.error)
              : setLastNameErrorMessage("");
            resoult.reason == "amount"
              ? setAmountErrorMessage(resoult.error)
              : setAmountErrorMessage("");
            resoult.reason == "card"
              ? setNumberCardErrorMessage(resoult.error)
              : setNumberCardErrorMessage("");
            resoult.reason == "validity"
              ? setNumberCardDateErrorMessage(resoult.error)
              : setNumberCardDateErrorMessage("");
            resoult.reason == "cvv"
              ? setNumberCardCVVErrorMessage(resoult.error)
              : setNumberCardCVVErrorMessage("");
          }
    }


    //--Validation

    const handleFirstName = (e) => {
        setNameFirst(e);
        handleValidateFirstName(e);
      }
    
      const handleValidateFirstName = (e) => {
        const resoult = validator.validationDonate({nameFirst: e});
        console.log('resoult',resoult);
    
        if(resoult?.isValid) {
            setFirstNameErrorMessage('');
        } else {
          resoult?.reason == 'nameFirst' ? setFirstNameErrorMessage(resoult?.error) : setFirstNameErrorMessage('');
        }
      }
    const handleLastName = (e) => {
        setNameLast(e);
        handleValidateLastName(e);
      }
    
      const handleValidateLastName = (e) => {
        const resoult = validator.validationDonate({nameLast: e});
    
        if(resoult?.isValid) {
            setLastNameErrorMessage('');
        } else {
          resoult?.reason == 'nameLast' ? setLastNameErrorMessage(resoult?.error) : setLastNameErrorMessage('');
        }
      }
    const handleAmount = (e) => {
        setAmount(e);
        handleValidateAmount(e);
      }
    
      const handleValidateAmount = (e) => {
        const resoult = validator.validationDonate({amount: e});
        console.log('resoult',resoult);
    
        if(resoult?.isValid) {
            setAmountErrorMessage('');
        } else {
          resoult?.reason == 'amount' ? setAmountErrorMessage(resoult?.error) : setAmountErrorMessage('');
        }
      }
    const handleCard = (e) => {
        setCard(e);
        handleValidateCard(e);
      }
    
      const handleValidateCard = (e) => {
        const resoult = validator.validationDonate({card: e});
        console.log('resoult',resoult);
    
        if(resoult?.isValid) {
            setNumberCardErrorMessage('');
        } else {
          resoult?.reason == 'card' ? setNumberCardErrorMessage(resoult?.error) : setNumberCardErrorMessage('');
        }
      }
    const handleValidity = (e) => {
        setValidity(e);
        handleValidateValidity(e);
      }
    
      const handleValidateValidity = (e) => {
        const resoult = validator.validationDonate({validity: e});
        console.log('resoult',resoult);
    
        if(resoult?.isValid) {
            setNumberCardDateErrorMessage('');
        } else {
          resoult?.reason == 'validity' ? setNumberCardDateErrorMessage(resoult?.error) : setNumberCardDateErrorMessage('');
        }
      }
    const handleCVV = (e) => {
        setCvv(e);
        handleValidateCVV(e);
      }
    
      const handleValidateCVV = (e) => {
        const resoult = validator.validationDonate({cvv: e});
        console.log('resoult',resoult);
    
        if(resoult?.isValid) {
            setNumberCardCVVErrorMessage('');
        } else {
          resoult?.reason == 'cvv' ? setNumberCardCVVErrorMessage(resoult?.error) : setNumberCardCVVErrorMessage('');
        }
      }

    return (
        <div className='modal_wrap'>
            <div className='item_body pad'>
            <div style={{marginTop: '50px'}}>
            <button onClick={() => setIsOpen(state => !state)}>X</button>
            </div>
                <h2>Please donate</h2>
                <div className='content_modal'>
                <div className="input_item">
                    <label htmlFor="name">First Name*</label>
                    <input
                        id="name"
                        type="text"
                        value={nameFirst}
                        onChange={(e) => handleFirstName(e.target.value)}
                    /> 
                </div>
                {firstNameErrorMessage && <p className="danger">{firstNameErrorMessage}</p>}
                <div className="input_item">
                    <label htmlFor="name">Last Name*</label>
                    <input
                        id="name"
                        type="text"
                        value={nameLast}
                        onChange={(e) => handleLastName(e.target.value)}
                    /> 
                </div>
                {lastNameErrorMessage && <p className="danger">{lastNameErrorMessage}</p>}
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
                        onChange={(e) => handleAmount(e.target.value)}
                    /> 
                </div>
                {amountErrorMessage && <p className="danger">{amountErrorMessage}</p>}
                <div className="input_item">
                    <label htmlFor="amount">Number card*</label>
                    <input
                        id="amount"
                        type="number"
                        value={card}
                        onChange={(e) => handleCard(e.target.value)}
                    /> 
                </div>
                {numberCardErrorMessage && <p className="danger">{numberCardErrorMessage}</p>}
                <div className="two_input_wrap">
                <div className="input_item">
                    <label htmlFor="amount">Validity *</label>
                    <input
                        id="amount"
                        type="number"
                        value={validity}
                        onChange={(e) => handleValidity(e.target.value)}
                    /> 
                </div>
                {numberCardDateErrorMessage && <p className="danger">{numberCardDateErrorMessage}</p>}
                <div className="input_item">
                    <label htmlFor="amount">CVV *</label>
                    <input
                        id="amount"
                        type="number"
                        value={cvv}
                        onChange={(e) => handleCVV(e.target.value)}
                    /> 
                </div>
                {numberCardCVVErrorMessage && <p className="danger">{numberCardCVVErrorMessage}</p>}
                </div>
                </div>
                <button onClick={handleSendDonats}>Confirm</button>
            </div>
        </div>
    );
};

export default DonatsModal;