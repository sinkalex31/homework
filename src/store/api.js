import http from 'utils/http';

const endpoint = '/customers';

const createCustomerData = ({ email, address, ...restValues }) => ({
    email,
    metadata: {
        ...address,
        ...restValues,
        date: new Date(),
    },
});

export const fetchCustomerList = params => http.get({
    url: endpoint,
    params,
});

export const fetchCustomer = id => http.get({
    url: `${endpoint}/${id}`,
});

export const removeCustomer = id => http.remove({
    url: `${endpoint}/${id}`,
});

export const createCustomer = data => http.post({
    url: endpoint,
    data: createCustomerData(data),
});

export const updateCustomer = ({ data, id }) => http.post({
    url: `${endpoint}/${id}`,
    data: createCustomerData(data),
});