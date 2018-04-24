import { fromJS } from 'immutable';

import types from './types';
import createReducer from 'utils/createReducer';

const initialState = fromJS({
    isEmpty: false,
    customersById: {},
    currentCustomerId: null,
});

const setCustomer = (state, { customer }) => (
    state.set('isEmpty', false).setIn(['customersById', customer.id], customer)
);

const removeCustomer = (state, { id }) => {
    return state.removeIn(['customersById', id]).set('isEmpty', !!state.get('customersById').count());
};

const setCustomerList = (state, { customers }) => (
    state.set('isEmpty', !customers.length).withMutations((context) => {
        customers.forEach(customer => setCustomer(context, { customer }));
    })
);

const setCurrentCustomerId = (state, { id }) => state.set('currentCustomerId', id);

export default createReducer({
    [types.SET_CUSTOMER]: setCustomer,
    [types.REMOVE_CUSTOMER]: removeCustomer,
    [types.SET_CUSTOMER_LIST]: setCustomerList,
    [types.SET_CURRENT_CUSTOMER_ID]: setCurrentCustomerId,
}, initialState);