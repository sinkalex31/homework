import React from 'react';
import { Form } from 'react-final-form';

const yupToFormErrors = yupError => {
    const errors = {};

    for (let i = 0, a = yupError.inner; i < a.length; i++) {
        const err = a[i];

        if (!errors[err.path]) {
            errors[err.path] = err.message;
        }
    }

    return errors;
};

const validateYupSchema = (data, schema, context) => {
    const ctx = context === undefined ? {} : context;
    const validateData = {};

    Object.keys(data).forEach(k => {
        const key = String(k);
        validateData[key] = data[key] !== '' ? data[key] : undefined;
    });

    return schema.validate(validateData, { abortEarly: false, ctx });
};

const validate = async (values, schema) => {
    let errors = {};

    try {
        await validateYupSchema(values, schema);
    } catch (error) {
        errors = yupToFormErrors(error);
    }

    return errors;
};

const formAdapter = ({ schema, onSubmit }) => Component => ({ dispatch, callback, isEditing, id, ...rest }) => (
    <Form
        {...rest}
        onSubmit={values => onSubmit({ values, isEditing, callback, id, dispatch })}
        component={Component}
        validate={values => validate(values, schema)}
    />
);

export default formAdapter;