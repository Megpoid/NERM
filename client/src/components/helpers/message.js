import React from 'react';

export const showErrorMessage = msg => {
    return(
        <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <h4 className="alert-heading">Error!</h4>
            <p className="mb-0">{ msg }</p>
        </div>
    )
}

export const showSuccessMessage = msg => {
    return(
        <div className="alert alert-dismissible alert-success">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <h4 className="alert-heading">Success!</h4>
            <p className="mb-0">{ msg }</p>
        </div>
    )
}