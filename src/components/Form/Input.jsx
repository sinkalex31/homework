import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';

import FormFeedback from './FormFeedback';

const InputComponent = ({ meta: { error, touched, submitError }, input, label, ...rest }) => (
    <FormGroup>
        {label && <Label for={name}>{label}</Label>}
        <Input
            className={classnames({
                'form-control-lg': true,
                'is-invalid': (error || submitError) && touched,
            })}
            {...input}
            {...rest}
        />
        <FormFeedback
            error={error}
            submitError={submitError}
            touched={touched}
            label={label}
        />
    </FormGroup>
);

InputComponent.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

InputComponent.defaultProps = {
    input: {},
    meta: {},
    placeholder: '',
    label: '',
    type: 'text',
};

export default InputComponent;