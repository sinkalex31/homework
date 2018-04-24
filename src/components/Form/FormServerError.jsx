import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledAlert } from 'reactstrap';

const FormServerError = ({ serverError }) => {
    if (!serverError || !serverError.length) return null;
    return <UncontrolledAlert color="danger">{serverError}</UncontrolledAlert>;
};

FormServerError.propTypes = {
    serverError: PropTypes.string.isRequired,
};

FormServerError.defaultProps = {
    serverError: '',
};

export default FormServerError;