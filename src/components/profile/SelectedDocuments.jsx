import React, { useEffect, useState, useRef } from "react";

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

    const handleDocumentTypeChange = (e) => {
        setDocumentType(e.target.value);
      };
      const handlePassportTypeChange = (e) => {
        setPassportType(e.target.value);
      };
  
    return (
        <div className="content">
        <div className="input_item">
          <label htmlFor="document_type">Document Type</label>
          <select id="document_type" value={documentType} onChange={handleDocumentTypeChange}>
            <option value="passport">Passport</option>
            <option value="driverLicense">Driver's License</option>
          </select>
        </div>
        {documentType === "driverLicense" && (
          <div>
            <div className="input_item">
              <label htmlFor="front_side">Front Side of Driver's License</label>
              <input type="file" name="front_side" />
            </div>
            <div className="input_item">
              <label htmlFor="back_side">Back Side of Driver's License</label>
              <input type="file" name="back_side" />
            </div>
          </div>
        )}
        {documentType === "passport" && (
          <div>
            <div className="input_item">
              <label htmlFor="passport_type">Passport Type</label>
              <select id="passport_type" value={passportType} onChange={handlePassportTypeChange}>
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>
            </div>
            {passportType === "new" && (
              <div>
                <div className="input_item">
                  <label htmlFor="front_page">Front Page of Passport</label>
                  <input type="file" name="front_page" />
                </div>
                <div className="input_item">
                  <label htmlFor="back_page">Back Page of Passport</label>
                  <input type="file" name="back_page" />
                </div>
              </div>
            )}
            {passportType === "old" && (
              <div>
                <div className="input_item">
                  <label htmlFor="page1">Page 1 of Passport</label>
                  <input type="file" name="page1"/>
                </div>
                <div className="input_item">
                  <label htmlFor="page2">Page 2 of Passport</label>
                  <input type="file" name="page2" />
                </div>
                <div className="input_item">
                  <label htmlFor="page3">Page 3 of Passport</label>
                  <input type="file" name="page3" />
                </div>
                <div className="input_item">
                  <label htmlFor="page4">Page 4 of Passport</label>
                  <input type="file" name="page4" />
                </div>
                <div className="input_item">
                  <label htmlFor="registration">Registration Page of Passport</label>
                  <input type="file" name="registration" />
                </div>
              </div>
            )}
          </div>
        )}
        </div>
    );
};

export default SelectedDocuments;