import { fromJS, Map } from 'immutable';

import reducer from './reducer';
import * as selectors from './selectors';

const customerOne = {
    id: '1',
    metadata: {
        date: new Date('2018.01.10 14:00'),
    },
};

const customerTwo = {
    id: '2',
    metadata: {
        date: new Date('2018.02.15 10:00'),
    },
};

describe('selectors', () => {
    const state = reducer(fromJS({
        customer: {
            isEmpty: false,
            customersById: Map({
                '1': customerOne,
                '2': customerTwo,
            }),
            currentCustomerId: '1',
        }
    }), {});

    const emptyState = reducer(fromJS({
        customer: {
            isEmpty: false,
            customersById: Map({}),
            currentCustomerId: null,
        }
    }), {});

    it('should return current customer', () => {
        const customer = selectors.currentCustomerSelector(state);
        expect(customer).toEqual(customerOne);
    });

    it('should return ordered customer list', () => {
        const customers = selectors.customerListSelector(state).toJS();
        expect(customers).toEqual([customerTwo, customerOne]);
    });

    it('should return state of customers list size', () => {
        let isEmpty = selectors.isEmptyListSelector(state);
        expect(isEmpty).toEqual(false);
    });
});