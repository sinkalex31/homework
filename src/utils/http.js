import axios from 'axios';
import qs from 'qs';

import config from '../config';

const client = axios.create({
    baseURL: config.baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${config.STRIPE_API_KEY}`,
    },
});

const requestWorker = async (method, { data, ...options }) => {
    const requestData = {
        method,
        data: qs.stringify(data),
        ...options,
    };

    try {
        return await client.request(requestData);
    } catch ({ message }) {
        return {
            error: message ? message : 'Something went wrong, please try again'
        };
    }
};

const get = options => requestWorker('get', options);

const post = options => requestWorker('post', options);

const put = options => requestWorker('put', options);

const remove = options => requestWorker('delete', options);

export default { get, post, put, remove };