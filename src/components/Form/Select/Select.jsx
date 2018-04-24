import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import { DropdownList } from 'react-widgets';
import classnames from 'classnames';

import FormFeedback from '../FormFeedback';

import './_Select.scss';

const Select = ({ input, meta, label, options, ...rest }) => (
    <FormGroup>
        {label && <Label for={input.name}>{label}</Label>}
        <DropdownList
            className={classnames({
                'is-invalid': meta.error && meta.touched,
            })}
            {...rest}
            {...input}
            data={options}
            onChange={result => input.onChange(result)}
            caseSensitive={false}
        />
        <FormFeedback {...meta} label={label} />
    </FormGroup>
);

Select.propTypes = {
    options: PropTypes.array.isRequired,
    textField: PropTypes.string.isRequired,
    valueField: PropTypes.string,
    label: PropTypes.string,
    busy: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Select.defaultProps = {
    valueField: null,
    label: '',
    value: '',
    busy: false,
};

export default Select;