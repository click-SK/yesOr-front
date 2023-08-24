import React, { useState } from "react";
import SelectedDocumentItem from "./SelectedDocumentItem";
import axios from "axios";
import {BASE_URL} from '../../http/baseUrl';
import { useSelector } from "react-redux";


const SelectedDocuments = () => {
    const [passportNewImage1, setPassportNewImage1] = useState(null);
    const [passportNewImage1Src, setPassportNewImage1Src] = useState(null);
    const [passportNewImage2, setPassportNewImage2] = useState(null);
    const [passportNewImage2Src, setPassportNewImage2Src] = useState(null);
    const [passportOldImage1, setPassportOldImage1] = useState(null);
    const [passportOldmage1Src, setPassportOldImage1Src] = useState(null);
    const [passportOldImage2, setPassportOldImage2] = useState(null);
    const [passportOldmage2Src, setPassportOldImage2Src] = useState(null);
    const [passportOldImage3, setPassportOldImage3] = useState(null);
    const [passportOldmage3Src, setPassportOldImage3Src] = useState(null);
    const [passportOldImage4, setPassportOldImage4] = useState(null);
    const [passportOldmage4Src, setPassportOldImage4Src] = useState(null);
    const [passportOldImage5, setPassportOldImage5] = useState(null);
    const [passportOldmage5Src, setPassportOldImage5Src] = useState(null);
    const [driverDocumentImage1, setDriverDocumentImage1] = useState(null);
    const [driverDocumentImage1Src, setDriverDocumentImage1Src] = useState(null);
    const [driverDocumentImage2, setDriverDocumentImage2] = useState(null);
    const [driverDocumentImage2Src, setDriverDocumentImage2Src] = useState(null);

    const [documentType, setDocumentType] = useState("passport");
    const [passportType, setPassportType] = useState("new");

    const cleanState = () => {
      setPassportNewImage1('');
      setPassportNewImage1Src('');
      setPassportNewImage2('');
      setPassportNewImage2Src('');
      setPassportOldImage1('');
      setPassportOldImage1Src('');
      setPassportOldImage2('');
      setPassportOldImage2Src('');
      setPassportOldImage3('');
      setPassportOldImage3Src('');
      setPassportOldImage4('');
      setPassportOldImage4Src('');
      setPassportOldImage5('');
      setPassportOldImage5Src('');
      setDriverDocumentImage1('');
      setDriverDocumentImage1Src('');
      setDriverDocumentImage2('');
      setDriverDocumentImage2Src('');
    }

    const handleDocumentTypeChange = (e) => {
        setDocumentType(e.target.value);
        cleanState();
      };
      const handlePassportTypeChange = (e) => {
        setPassportType(e.target.value);
        cleanState();
      };

      const {user} = useSelector((state) => state.authUser.user);

      const handleUploadDocuments = () => {
        try {
          let images = [];
          passportNewImage1 && images.push(passportNewImage1);
          passportNewImage2 && images.push(passportNewImage2);
          passportOldImage1 && images.push(passportOldImage1);
          passportOldImage2 && images.push(passportOldImage2);
          passportOldImage3 && images.push(passportOldImage3);
          passportOldImage4 && images.push(passportOldImage4);
          passportOldImage5 && images.push(passportOldImage5);
          driverDocumentImage1 && images.push(driverDocumentImage1);
          driverDocumentImage2 && images.push(driverDocumentImage2);

          const formData = new FormData();
          formData.append("id", user._id);
          images.forEach((image, index) => {
            console.log('images',image);
            formData.append(`userDocuments`, image);
          });
          axios.patch(`${BASE_URL}/upload-user-document`, formData).then((response) => {
            console.log(response.data);
          }).catch((error) => {
            console.log(error);
          });
      
        } catch (error) {
          console.log(error);
        }
      }

  
    return (
      <div className="content">
        <div className="input_item">
          <label htmlFor="document_type">Document Type</label>
          <select
            id="document_type"
            value={documentType}
            onChange={handleDocumentTypeChange}
          >
            <option value="passport">Passport</option>
            <option value="driverLicense">Driver's License</option>
          </select>
        </div>
        {documentType === "driverLicense" && (
          <div>
                <SelectedDocumentItem label={"Front Side of Driver's License"} 
                src={driverDocumentImage1Src} 
                inputName={'front_side'} 
                setSrc={setDriverDocumentImage1Src} 
                image={driverDocumentImage1} 
                setImage={setDriverDocumentImage1}/>
                <SelectedDocumentItem label={"Back Side of Driver's License"} 
                src={driverDocumentImage2Src} 
                inputName={'back_side'} 
                setSrc={setDriverDocumentImage2Src} 
                image={driverDocumentImage2} 
                setImage={setDriverDocumentImage2}/>
          </div>
        )}
        {documentType === "passport" && (
          <div>
            <div className="input_item">
              <label htmlFor="passport_type">Passport Type</label>
              <select
                id="passport_type"
                value={passportType}
                onChange={handlePassportTypeChange}
              >
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>
            </div>
            {passportType === "new" && (
              <div>
                <SelectedDocumentItem label={'Front Page of Passport'} 
                src={passportNewImage1Src} 
                inputName={'front_page'} 
                setSrc={setPassportNewImage1Src} 
                image={passportNewImage1} 
                setImage={setPassportNewImage1}/>
                <SelectedDocumentItem label={'Back Page of Passport'} 
                src={passportNewImage2Src} 
                inputName={'back_page'} 
                setSrc={setPassportNewImage2Src} 
                image={passportNewImage2} 
                setImage={setPassportNewImage2}/>
              </div>
            )}
            {passportType === "old" && (
              <div>
                <SelectedDocumentItem label={'Page 1 of Passport'} 
                src={passportOldmage1Src} 
                inputName={'page1'} 
                setSrc={setPassportOldImage1Src} 
                image={passportOldImage1} 
                setImage={setPassportOldImage1}/>
                <SelectedDocumentItem label={'Page 2 of Passport'} 
                src={passportOldmage2Src} 
                inputName={'page2'} 
                setSrc={setPassportOldImage2Src} 
                image={passportOldImage2} 
                setImage={setPassportOldImage2}/>
                <SelectedDocumentItem label={'Page 3 of Passport'} 
                src={passportOldmage3Src} 
                inputName={'page3'} 
                setSrc={setPassportOldImage3Src} 
                image={passportOldImage3} 
                setImage={setPassportOldImage3}/>
                <SelectedDocumentItem label={'Page 4 of Passport'} 
                src={passportOldmage4Src} 
                inputName={'page4'} 
                setSrc={setPassportOldImage4Src} 
                image={passportOldImage4} 
                setImage={setPassportOldImage4}/>
                <SelectedDocumentItem label={'Registration Page of Passport'} 
                src={passportOldmage5Src} 
                inputName={'registration'} 
                setSrc={setPassportOldImage5Src} 
                image={passportOldImage5} 
                setImage={setPassportOldImage5}/>
              </div>
            )}
          </div>
        )}
        <div style={{marginTop: '20px'}}>
            <button onClick={handleUploadDocuments}>Upload documents</button>
        </div>
      </div>
    );
};

export default SelectedDocuments;