import React, {useEffect, useRef} from 'react';

const SelectedDocumentItem = ({src, setSrc, image, label, inputName, setImage}) => {

    useEffect(() => {
        if (image) {
          const reader = new FileReader();
          reader.onload = () => {
            setSrc(reader.result);
          };
          reader.readAsDataURL(image);
        }
      }, [image]);

    const inputFileRef = useRef(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

    return (
        <div className="input_item wrap_document_item">
        <label htmlFor={inputName}>{label}</label>
        {src && (
          <div className='img_documents_wrapper'>
            <img src={src} className='img_document' />
          </div>
        )}
        <input
          type="file"
          name={inputName}
          onChange={handleImageChange}
          ref={inputFileRef}
          hidden
        />
        <button className='btn_download_document' onClick={() => inputFileRef.current.click()}>
          Download
        </button>
      </div>
    );
};

export default SelectedDocumentItem;