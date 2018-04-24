import { asyncComponent } from 'react-async-component';

import App from './App';

export default [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: asyncComponent({
                    resolve: () => import('./pages/CustomersPage'),
                }),
            },
            {
                path: '/customer/:id',
                component: asyncComponent({
                    resolve: () => import('./pages/CustomerInfoPage'),
                }),
            },
            {
                path: '/create',
                component: asyncComponent({
                    resolve: () => import('./pages/CustomerCreatePage'),
                }),
            },
            {
                path: '*',
                component: asyncComponent({
                    resolve: () => import('./pages/NotFoundPage'),
                }),
            },
        ],
    },
];
