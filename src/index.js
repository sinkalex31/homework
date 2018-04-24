import React from 'react';
import { render } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Routes from './Routes';
import configureStore from './store';

import '../scss/index.scss';

const history = createHistory();
const store = configureStore(history);

const renderApp = routes => render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(routes)}
        </ConnectedRouter>
    </Provider>,
    document.querySelector('.root'),
);

renderApp(Routes);

if (module.hot) {
    module.hot.accept('./Routes', () => renderApp(Routes));
}