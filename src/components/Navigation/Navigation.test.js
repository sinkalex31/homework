import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Navigation from './Navigation';

describe('Navigation', () => {
    it ('should render correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});