import { takeLatest, call, put, fork } from 'redux-saga/effects';
import types from './types';
import { fetchCustomerList, fetchCustomer, removeCustomer } from './api';
import * as actions from './actions';

function* watchLastCustomerListFetch() {
    yield takeLatest(types.FETCH_CUSTOMER_LIST, function* ({ payload }) {
        const { data } = yield call(fetchCustomerList, payload);

        if (!data) return;

        yield put(actions.setCustomerList({
            customers: data.data,
        }));
    });
}

function* watchLastCustomerFetch() {
    yield takeLatest(types.FETCH_CUSTOMER, function* ({ payload: { id } }) {
        const { data } = yield call(fetchCustomer, id);

        if (!data) return;

        yield put(actions.setCustomer({
            customer: data,
        }));

        yield put(actions.setCurrentCustomerId({ id }));
    });
}

function* watchLastCustomerRemoveRequest() {
    yield takeLatest(types.REMOVE_CUSTOMER_REQUEST, function* ({ payload: { id } }) {
        const { data } = yield call(removeCustomer, id);

        if (!data) return;

        yield put(actions.removeCustomer({ id }));
    });
}

const sagas = [
    watchLastCustomerListFetch,
    watchLastCustomerFetch,
    watchLastCustomerRemoveRequest,
];

export default function* rootSaga() {
    yield* sagas.map(saga => fork(saga));
}