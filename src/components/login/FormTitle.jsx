import React from 'react';

const FormTitle = ({hendlerChange, isSingIn}) => {
    return (
        <div className='form_title'>
        <h3 
        className={isSingIn ? '' : 'active_form'}
        onClick={() => hendlerChange()}
        >Login</h3>
        <h3
        className={isSingIn ? 'active_form' : ''}
        onClick={() => hendlerChange()}
        >Sign up</h3>
</div>
    );
};

export default FormTitle;