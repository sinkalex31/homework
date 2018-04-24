import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import customerReducer from './reducer';
import rootSaga from './sagas';

const configureStore = (history) => {
    const rootReducer = combineReducers({
        router: routerReducer,
        customer: customerReducer,
    });
    const reduxRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(reduxRouterMiddleware, sagaMiddleware));

    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const nextReducer = combineReducers({
                router: routerReducer,
                ...require('./reducer'),
            });
            store.replaceReducer(nextReducer);
        });
    }

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;