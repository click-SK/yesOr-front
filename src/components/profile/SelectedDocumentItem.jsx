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
        <div className="input_item">
        <label htmlFor={inputName}>{label}</label>
        {src && (
          <div style={{width: '100px', height: '100px'}}>
            <img src={src} style={{width: '100%', height: '100%'}}/>
          </div>
        )}
        <input
          type="file"
          name={inputName}
          onChange={handleImageChange}
          ref={inputFileRef}
          hidden
        />
        <button onClick={() => inputFileRef.current.click()}>
          Download
        </button>
      </div>
    );
};

export default SelectedDocumentItem;