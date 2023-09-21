import React, { useState, useEffect, useRef } from "react";
import '../../../styles/modalWindow.scss'
import axios from "axios";
import { BASE_URL } from '../../../http/baseUrl';
import { useSelector } from 'react-redux';
import * as validator from '../../../validation/validator';
import ErrorMessage from '../../validation/ErrorMessage';
const DonatsModal = ({setIsOpen, currentProject}) => {
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");
    const modalRef = useRef();
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

    const handleSendDonats = () => {
        const resoult = validator.validationDonate({
            nameFirst,
            nameLast,
            amount,
            card,
            validity,
            cvv,
          });
          let isValid = false;

          if(resoult.length == 0) {
            isValid = true;
          } else {
            resoult.forEach((item) => {
              item.reason == 'nameFirst' && setFirstNameErrorMessage(item?.error);
              item.reason == 'nameLast' && setLastNameErrorMessage(item.error);
              item.reason == 'amount' && setAmountErrorMessage(item.error);
              item.reason == 'card' && setNumberCardErrorMessage(item.error);
              item.reason == 'validity' && setNumberCardDateErrorMessage(item.error);
              item.reason == 'cvv' && setNumberCardCVVErrorMessage(item.error);
            })
          }

          if(isValid) {
            axios.patch(`${BASE_URL}/donats-project`, {
                projectId: currentProject?._id,
                sum: amount,
                user: `${nameFirst} ${nameLast}`,
                comment: description,
                userId: user?._id
            }).then(() => {
                alert('succeed donates')
                window.location.reload();
            })
            .catch((error) => {
              console.log('Request error',error);
          })
          } 
    }


    //--Validation

    const handleFirstName = (e) => {
        setNameFirst(e);
        if(e != '') {
          handleValidateFirstName(e);
        } else {
          setFirstNameErrorMessage('');
        }
      }
    
      const handleValidateFirstName = (e) => {
        const resoult = validator.validationDonate({nameFirst: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'nameFirst' ? setFirstNameErrorMessage(item.error) : setFirstNameErrorMessage('');
          })
        } else {
          setFirstNameErrorMessage('');
        }
      }
    const handleLastName = (e) => {
        setNameLast(e);
        if(e != '') {
          handleValidateLastName(e);
        } else {
          setLastNameErrorMessage('');
        }
      }
    
      const handleValidateLastName = (e) => {
        const resoult = validator.validationDonate({nameLast: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'nameLast' ? setLastNameErrorMessage(item.error) : setLastNameErrorMessage('');
          })
        } else {
          setLastNameErrorMessage('');
        }
      }
    const handleAmount = (e) => {
        setAmount(e);
        if(e != '') {
          handleValidateAmount(e);
        } else {
          setAmountErrorMessage('');
        }
      }
    
      const handleValidateAmount = (e) => {
        const resoult = validator.validationDonate({amount: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'amount' ? setAmountErrorMessage(item.error) : setAmountErrorMessage('');
          })
        } else {
          setAmountErrorMessage('');
        }
      }
    // const handleCard = (e) => {
      // if(e.length > 16) {
      //   e = e.slice(0, 16);
      // }
    //     setCard(e);
        // if(e != '') {
        //   handleValidateCard(e);
        // } else {
        //   setNumberCardErrorMessage('');
        // }
    //   }

    const handleCard = (e) => {
      if(e.length > 19) {
        e = e.slice(0, 19);
      }
      // Удаляем все нецифровые символы и дефисы
      const input = e.replace(/[^0-9]/g, "");
  
      // Разбиваем номер карты на группы по 4 цифры и объединяем их с дефисами
      const formattedCard = input.length != 0 ? input
        .match(/.{1,4}/g)
        .join("-")
        :
        ''
  
      setCard(formattedCard);
      if(e != '') {
        handleValidateCard(e);
      } else {
        setNumberCardErrorMessage('');
      }
    };
    
      const handleValidateCard = (e) => {
        const resoult = validator.validationDonate({card: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'card' ? setNumberCardErrorMessage(item.error) : setNumberCardErrorMessage('');
          })
        } else {
          setNumberCardErrorMessage('');
        }
      }

      const handleValidity = (e) => {
        if(e.length > 5) {
          e = e.slice(0, 5);
        }
        if(e != '') {
          handleValidateValidity(e);
        } else {
          setNumberCardDateErrorMessage('');
        }
        let input = e;
        // Удаляем все нецифровые символы
        input = input.replace(/\D/g, "");
        // Если длина ввода больше 2, добавляем "/" после первых двух символов
        if (input.length > 2) {
          input = input.slice(0, 2) + "/" + input.slice(2);
        }
        setValidity(input);
      };
    
      const handleValidateValidity = (e) => {
        const resoult = validator.validationDonate({validity: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'validity' ? setNumberCardDateErrorMessage(item.error) : setNumberCardDateErrorMessage('');
          })
        } else {
          setNumberCardDateErrorMessage('');
        }
      }
    const handleCVV = (e) => {
      if(e.length > 3) {
        e = e.slice(0, 3);
      }
        setCvv(e);
        if(e != '') {
          handleValidateCVV(e);
        } else {
          setNumberCardCVVErrorMessage('');
        }
      }
    
      const handleValidateCVV = (e) => {
        const resoult = validator.validationDonate({cvv: e});

        if(resoult.length !== 0) {
          resoult.forEach((item) => {
            item.reason == 'cvv' ? setNumberCardCVVErrorMessage(item.error) : setNumberCardCVVErrorMessage('');
          })
        } else {
          setNumberCardCVVErrorMessage('');
        }
      }

      useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []); 
    

    return (
        <div className='modal_wrap'>
            <div className='item_body pad modal' ref={modalRef}>
                <h2 style={{margin:'500px 0 0 0'}}>Please donate</h2>
                <div className='content_modal'>
                <div className="input_item">
                    <label htmlFor="name">First Name *</label>
                    <input
                        id="name"
                        type="text"
                        value={nameFirst}
                        onChange={(e) => handleFirstName(e.target.value)}
                    /> 
                <ErrorMessage errorMessage={firstNameErrorMessage}/>
                </div>
                <div className="input_item">
                    <label htmlFor="name">Last Name *</label>
                    <input
                        id="name"
                        type="text"
                        value={nameLast}
                        onChange={(e) => handleLastName(e.target.value)}
                    /> 
                </div>
                <ErrorMessage errorMessage={lastNameErrorMessage}/>
                <div className="input_item">
          <label htmlFor="description">Comment *</label>
          <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
            </div>
            <div className="input_item">
                    <label htmlFor="amount">Donation amount *</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => handleAmount(e.target.value)}
                    /> 
                </div>
                <ErrorMessage errorMessage={amountErrorMessage}/>
                <div className="input_item">
                    <label htmlFor="amount">Number card *</label>
                    <input
                        id="amount"
                        type="text"
                        value={card}
                        onChange={(e) => handleCard(e.target.value)}
                    /> 
                </div>
                <ErrorMessage errorMessage={numberCardErrorMessage}/>
                <div className="two_input_wrap">
                <div className="input_item">
                    <label htmlFor="amount">Validity *</label>
                    <input
                        id="amount"
                        type="text"
                        value={validity}
                        onChange={(e) => handleValidity(e.target.value)}
                    /> 
                </div>
                <ErrorMessage errorMessage={numberCardDateErrorMessage}/>
                <div className="input_item">
                    <label htmlFor="amount">CVV *</label>
                    <input
                        id="amount"
                        type="number"
                        value={cvv}
                        onChange={(e) => handleCVV(e.target.value)}
                    /> 
                </div>
                <ErrorMessage errorMessage={numberCardCVVErrorMessage}/>
                </div>
                </div>
                <div className="button-wrap-donats">
                <button onClick={() => setIsOpen(state => !state)}>Discard</button>
                <button onClick={handleSendDonats}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DonatsModal;