import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import CustomerList from './CustomerList';

const customers = [
    {
        id: '1',
        metadata: {
            date: new Date('2018.01.10 14:00'),
        },
    },
    {
        id: '2',
        metadata: {
            date: new Date('2018.02.15 10:00'),
        },
    },
];

describe('CustomerList', () => {
    it ('should render correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <CustomerList customers={customers} removeCustomer={() => {}}/>
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});