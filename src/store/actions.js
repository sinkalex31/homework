import types from './types';

export const fetchCustomerList = payload => ({
    type: types.FETCH_CUSTOMER_LIST,
    payload,
});

export const fetchCustomer = payload => ({
   type: types.FETCH_CUSTOMER,
   payload,
});

export const setCustomerList = payload => ({
    type: types.SET_CUSTOMER_LIST,
    payload,
});

export const removeCustomer = payload => ({
    type: types.REMOVE_CUSTOMER,
    payload,
});

export const removeCustomerRequest = payload => ({
    type: types.REMOVE_CUSTOMER_REQUEST,
    payload,
});

export const setCustomer = payload => ({
    type: types.SET_CUSTOMER,
    payload,
});

export const setCurrentCustomerId = payload => ({
    type: types.SET_CURRENT_CUSTOMER_ID,
    payload,
});