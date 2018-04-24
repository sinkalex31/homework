import React from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';
import { Container } from 'reactstrap';

import { Navigation } from 'components';

const App = ({ route: { routes } }) => (
    <div>
        <Navigation />
        <Container>
            {renderRoutes(routes)}
        </Container>
    </div>
);

export default hot(module)(App);