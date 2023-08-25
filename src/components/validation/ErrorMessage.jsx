import React from 'react';
import '../../styles/errorMessage.scss';
const ErrorMessage = ({errorMessage}) => {
    return (
        <div style={{position:'relative'}}>
        {errorMessage && <p className="error_message" style={{position:'absolute'}}>{errorMessage}</p>}
        </div>
    );
};

export default ErrorMessage;