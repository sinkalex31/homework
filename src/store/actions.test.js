import * as actions from './actions';
import types from './types';

describe('actions', () => {
    it('should create an action to create a customer', () => {
        const expectedAction = {
            type: types.SET_CUSTOMER,
            payload: {}
        };
        expect(actions.setCustomer({})).toEqual(expectedAction)
    });
});