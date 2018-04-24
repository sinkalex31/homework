import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, FormGroup } from 'reactstrap';
import { FORM_ERROR } from 'final-form';
import { Field } from 'react-final-form';
import { push } from 'react-router-redux';

import { formAdapter } from 'hocs';
import { Input, AddressSearch, FormServerError } from 'components/Form';
import { createCustomer, updateCustomer } from 'store/api';
import { setCustomer } from 'store/actions';
import schema from './customerFormSchema';

const onSubmit = async ({ values, isEditing, id, callback, dispatch }) => {
    let response;

    if (isEditing) {
        response = await updateCustomer({
            data: values,
            id,
        });
    } else {
        response = await createCustomer(values);
    }

    const { data, error } = response;

    if (error) return { [FORM_ERROR]: error };

    dispatch(setCustomer({ customer: data }));

    if (!isEditing) {
        dispatch(push('/'))
    } else {
        callback();
    }
};

const CustomerCreateForm = ({ handleSubmit, reset, submitting, pristine, values, submitError, dirty }) => (
    <Form onSubmit={handleSubmit} size="large" noValidate>
        <Field
            name="email"
            label="Email"
            type="email"
            placeholder="Type email"
            component={Input}
        />
        <Field
            name="fullName"
            label="Full name"
            type="text"
            placeholder="Type full name"
            component={Input}
        />
        <Field
            name="address"
            label="Full address"
            placeholder="Type full address"
            component={AddressSearch}
        />
        <FormGroup>
            <Button
                type="submit"
                color="primary"
                size="lg"
                block
                disabled={!dirty || submitting}
            >
                Save
            </Button>
        </FormGroup>
        <FormServerError serverError={submitError} />
    </Form>
);

export default connect()(formAdapter({
    schema, onSubmit,
})(CustomerCreateForm));