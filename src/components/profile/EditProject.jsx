import React from 'react';

const EditProject = ({selectedProject,setShowEdit}) => {
    return (
        <div>
            <h1>hi</h1>
            <button onClick={() => setShowEdit(state => !state)}>x</button>
        </div>
    );
};

export default EditProject;