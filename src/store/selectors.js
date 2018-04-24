import { createSelector } from 'reselect';
import { createGetSelector } from 'reselect-immutable-helpers';

const getCustomer = state => state.get('customer');

export const isEmptyListSelector = createGetSelector(getCustomer, 'isEmpty');

export const customerListSelector = createSelector(
    createGetSelector(getCustomer, 'customersById'),
    customers => customers
        .sort((a, b) => (new Date(b.metadata.date) - new Date(a.metadata.date)))
        .toIndexedSeq(),
);

export const currentCustomerSelector = createSelector(
    createGetSelector(getCustomer, 'customersById'),
    createGetSelector(getCustomer, 'currentCustomerId'),
    (customers, id) => customers.get(id),
);