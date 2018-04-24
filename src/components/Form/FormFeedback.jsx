import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';

const FormFeedbackComponent = ({ error, submitError, touched, label }) => {
    const err = error || submitError;

    if (!err || !touched) return null;

    return <FormFeedback>{err.replace(/^\S+/, label)}</FormFeedback>;
};

FormFeedbackComponent.propTypes = {
    label: PropTypes.string.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.string,
    submitError: PropTypes.string,
};

FormFeedbackComponent.defaultProps = {
    touched: false,
    error: '',
    submitError: '',
};

export default FormFeedbackComponent;