import { fromJS, Map } from 'immutable';

import reducer from './reducer';
import types from './types';

describe('customer reducer', () => {
    const initialState = fromJS({
        isEmpty: false,
        customersById: {},
        currentCustomerId: null,
    });

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_CUSTOMER', () => {
        const action = {
            type: types.SET_CUSTOMER,
            payload: {
                customer: {
                    id: '1',
                    metadata: {},
                },
            },
        };

        expect(reducer(initialState, action)).toEqual(fromJS({
            isEmpty: false,
            customersById: Map({
                '1': {
                    id: '1',
                    metadata: {},
                }
            }),
            currentCustomerId: null,
        }))
    });

    it('should handle REMOVE_CUSTOMER', () => {
        const setAction = {
            type: types.SET_CUSTOMER,
            payload: {
                customer: {
                    id: '1',
                    metadata: {},
                },
            },
        };

        const removeAction = {
            type: types.REMOVE_CUSTOMER,
            payload: {
                id: '1',
            },
        };

        const state = reducer(initialState, setAction);

        expect(reducer(state, removeAction)).toEqual(fromJS({
            isEmpty: true,
            customersById: Map({}),
            currentCustomerId: null,
        }))
    });

    it('should handle SET_CUSTOMER_LIST', () => {
        const action = {
            type: types.SET_CUSTOMER_LIST,
            payload: {
                customers: [
                    {
                        id: '1',
                        metadata: {},
                    },
                    {
                        id: '2',
                        metadata: {},
                    }
                ]
            },
        };

        expect(reducer(initialState, action)).toEqual(fromJS({
            isEmpty: false,
            customersById: Map({
                '1': {
                    id: '1',
                    metadata: {},
                },
                '2': {
                    id: '2',
                    metadata: {},
                }
            }),
            currentCustomerId: null,
        }))
    });

    it('should handle SET_CURRENT_CUSTOMER_ID', () => {
        const action = {
            type: types.SET_CURRENT_CUSTOMER_ID,
            payload: {
                id: '1',
            },
        };

        expect(reducer(initialState, action)).toEqual(fromJS({
            isEmpty: false,
            customersById: Map({}),
            currentCustomerId: '1',
        }))
    });
});