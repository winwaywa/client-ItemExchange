import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
NotFound.propTypes = {};

function NotFound(props) {
    return (
        <div>
            <Navigate to="/products" replace={true} />
        </div>
    );
}

export default NotFound;
